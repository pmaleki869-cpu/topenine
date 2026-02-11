"use server";

import { cookies } from "next/headers";
import { authenticate, createSession, COOKIE_NAME } from "@/lib/auth";

export async function loginAction(
  email: string,
  password: string
): Promise<{ success: true } | { success: false; error: string }> {
  const result = await authenticate(email, password);

  if (!result.success) {
    return { success: false, error: result.error };
  }

  const token = await createSession(result.user);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return { success: true };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
