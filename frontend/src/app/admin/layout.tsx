"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Toaster } from "sonner";
import {
  LayoutGrid,
  Package,
  FolderOpen,
  ImageIcon,
  Tag,
  ClipboardList,
  Users,
  Warehouse,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Shield,
} from "lucide-react";
import { logoutAction } from "./login/actions";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutGrid },
    ],
  },
  {
    label: "Catalog",
    items: [
      { href: "/admin/catalog/products", label: "Products", icon: Package },
      { href: "/admin/catalog/categories", label: "Categories", icon: FolderOpen },
      { href: "/admin/catalog/tags", label: "Tags", icon: Tag },
      { href: "/admin/catalog/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/orders", label: "Inquiries", icon: ClipboardList },
      { href: "/admin/customers", label: "Leads", icon: Users },
      { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await logoutAction();
    router.push("/admin/login");
    router.refresh();
  }

  // Generate breadcrumb from pathname
  const breadcrumb = pathname === "/admin"
    ? "Dashboard"
    : pathname
        .split("/")
        .filter(Boolean)
        .slice(1)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" / ");

  const sidebar = (
    <nav aria-label="Admin navigation" className="flex flex-col h-full bg-[#0b1121] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.06] shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[13px] font-bold shadow-lg shadow-blue-500/20">
          TE
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-tight tracking-tight">TopEngine</div>
          <div className="text-[11px] text-white/30 font-medium">Admin Panel</div>
        </div>
      </div>

      {/* Nav sections */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} role="group" aria-labelledby={`nav-${section.label}`}>
            <div
              id={`nav-${section.label}`}
              className="text-[11px] font-semibold uppercase tracking-wider text-white/25 px-3 mb-2"
            >
              {section.label}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                        active
                          ? "bg-white/[0.08] text-white shadow-sm"
                          : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className={`w-[18px] h-[18px] ${active ? "text-blue-400" : ""}`} strokeWidth={1.75} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.06] px-4 py-3 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-[12px] text-white/30 hover:text-white/60 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Storefront
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-50/80 overflow-hidden">
      <Toaster position="top-right" richColors closeButton />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[248px] transition-transform duration-200 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin sidebar"
      >
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-3 z-10 p-1 rounded-md hover:bg-white/10 text-white/50"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebar}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-[14px] font-semibold text-gray-800">
              {breadcrumb}
            </h1>
          </div>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[11px] font-bold text-white">
                A
              </div>
              <span className="text-[13px] font-medium text-gray-700 hidden sm:inline">Admin</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-200/50 py-1.5 z-50">
                <div className="px-3.5 py-2.5 border-b border-gray-100">
                  <p className="text-[13px] font-medium text-gray-900">Admin</p>
                  <p className="text-[12px] text-gray-400">admin@topengine.ae</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main id="admin-content" className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
