"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/shop", label: "All Parts" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/returns", label: "Returns Policy" },
  { href: "/order-tracking", label: "Order Status" },
];

/**
 * MobileMenu — slide-out drawer triggered by hamburger button.
 * Visible only below `lg` breakpoint. Locks body scroll when open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
    setMenuSearch("");
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-9 h-9 rounded-md text-text-disabled hover:text-text-inverse transition-colors"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface-inverse transform transition-transform duration-250 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-dark-border">
          <span className="text-[14px] font-semibold text-text-inverse">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-md text-text-disabled hover:text-text-inverse transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick search in drawer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = menuSearch.trim();
            if (trimmed) {
              router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
              setOpen(false);
            }
          }}
          className="px-3 py-3 border-b border-dark-border"
        >
          <div className="flex rounded-md overflow-hidden bg-dark-surface border border-dark-border">
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Search parts…"
              aria-label="Search for engine parts"
              className="flex-1 px-3 py-2.5 text-[14px] text-text-inverse bg-transparent outline-none placeholder:text-dark-text-muted"
            />
            <button
              type="submit"
              className="px-3 text-text-disabled hover:text-text-inverse transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Nav links */}
        <nav className="py-3 px-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[15px] transition-colors ${
                  isActive
                    ? "bg-dark-surface text-text-inverse font-semibold"
                    : "text-text-disabled hover:text-text-inverse hover:bg-dark-surface-hover"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* WhatsApp CTA in drawer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
          <a
            href="https://wa.me/971551521264?text=Hi%2C%20I%20need%20help%20finding%20an%20engine%20part."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-status-success text-text-inverse font-semibold text-[14px] hover:bg-[#047857] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
