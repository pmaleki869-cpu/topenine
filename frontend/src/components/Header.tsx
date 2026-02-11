"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UnifiedSearch } from "./UnifiedSearch";
import { MobileMenu } from "./MobileMenu";

/**
 * Header — v9.0 (Unified Search)
 * 56px band: logo | instant search (desktop) | All Parts + Vehicles | phone | mobile search icon + hamburger
 */
export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [heroVisible, setHeroVisible] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Observe hero section visibility on homepage
  useEffect(() => {
    if (!isHomepage) {
      setHeroVisible(false);
      return;
    }

    setHeroVisible(true);
    const hero = document.getElementById("hero");
    if (!hero) {
      setHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHomepage]);

  const showSearch = !isHomepage || !heroVisible;

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-inverse" role="banner">
        <div className="container-main">
          <div className="flex items-center gap-4 h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/logo.png"
                alt="TopEngine"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Instant search — desktop only, hidden on homepage while hero is in view */}
            {showSearch && (
              <div className="hidden lg:block flex-1 max-w-lg">
                <UnifiedSearch variant="header" />
              </div>
            )}

            {/* Spacer when search is hidden */}
            {!showSearch && <div className="hidden lg:block flex-1" />}

            {/* Nav links — desktop only */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-medium shrink-0" aria-label="Main navigation">
              <Link
                href="/shop"
                className="px-3 py-2 rounded-md text-text-inverse/80 hover:text-text-inverse transition-colors"
              >
                All Parts
              </Link>
              <Link
                href="/vehicles"
                className="px-3 py-2 rounded-md text-text-inverse/60 hover:text-text-inverse transition-colors"
              >
                Vehicles
              </Link>
            </nav>

            {/* Phone number — desktop only */}
            <a
              href="tel:+971551521264"
              className="hidden lg:inline text-[12px] text-text-disabled hover:text-text-inverse font-mono shrink-0 transition-colors"
              aria-label="Call TopEngine"
            >
              +971 55 152 1264
            </a>

            {/* Mobile search icon */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-text-disabled hover:text-text-inverse transition-colors"
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile hamburger menu */}
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Mobile fullscreen search overlay */}
      {mobileSearchOpen && (
        <UnifiedSearch
          variant="mobile"
          autoFocus
          onClose={() => setMobileSearchOpen(false)}
        />
      )}
    </>
  );
}
