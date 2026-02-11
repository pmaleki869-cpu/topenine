import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// In production, use process.env.AUTH_SECRET — for now, a hardcoded fallback
if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
  console.warn(
    "\u26A0\uFE0F  [TopEngine Auth] AUTH_SECRET env variable is not set! " +
    "Using hardcoded fallback — this is INSECURE for production. " +
    "Set AUTH_SECRET in your Vercel / hosting environment variables."
  );
}

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "topengine-admin-secret-change-in-production-2026"
);

const COOKIE_NAME = "te-admin-session";
const EXPIRY = "24h";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "catalog_manager" | "order_manager" | "viewer";
}

// Hardcoded admin credentials — replace with DB lookup in Phase 2
const ADMIN_USERS: { email: string; password: string; user: AdminUser }[] = [
  {
    email: "admin@topengine.ae",
    password: "TopEngine2026!",
    user: {
      id: "1",
      email: "admin@topengine.ae",
      name: "Admin",
      role: "super_admin",
    },
  },
];

export async function createSession(user: AdminUser): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(SECRET);

  return token;
}

export async function verifySession(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as AdminUser["role"],
    };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function authenticate(
  email: string,
  password: string
): Promise<{ success: true; user: AdminUser } | { success: false; error: string }> {
  const match = ADMIN_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) {
    return { success: false, error: "Invalid email or password" };
  }
  return { success: true, user: match.user };
}

export { COOKIE_NAME };
