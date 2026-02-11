"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";

/**
 * Header — v7.0
 * 56px band: logo | compact search (desktop, hidden on homepage until hero scrolls away) | All Parts + Vehicles | phone | hamburger (mobile)
 */
export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [heroVisible, setHeroVisible] = useState(true);

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

          {/* Compact search — desktop only, hidden on homepage while hero is in view */}
          {showSearch && (
            <div className="hidden lg:block flex-1 max-w-md">
              <SearchBar />
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

          {/* Mobile hamburger menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
