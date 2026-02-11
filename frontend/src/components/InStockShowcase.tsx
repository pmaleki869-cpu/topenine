"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import type { MakeProductGroup } from "@/lib/products";

/* ═══════════════════════════════════════════════════════════════════════════
   InStockShowcase — Professional tabbed carousel for homepage "In Stock Now"
   Tabs: All · Toyota · Nissan · Ford · Mitsubishi
   Carousel: CSS scroll-snap, arrow nav, touch-friendly
   ═══════════════════════════════════════════════════════════════════════════ */

interface InStockShowcaseProps {
  groups: MakeProductGroup[];
  allProducts: Product[];
  totalInStock: number;
}

// ─── Make brand colors for tab accents ────────────────────────────────────────
const MAKE_COLORS: Record<string, { ring: string; icon: string }> = {
  toyota:     { ring: "ring-red-500/20",    icon: "text-red-600" },
  nissan:     { ring: "ring-blue-500/20",   icon: "text-blue-600" },
  ford:       { ring: "ring-sky-500/20",    icon: "text-sky-600" },
  mitsubishi: { ring: "ring-rose-500/20",   icon: "text-rose-600" },
};

// ─── Make initial letters (used when no logo available) ──────────────────────
function MakeInitial({ slug, name }: { slug: string; name: string }) {
  const color = MAKE_COLORS[slug]?.icon ?? "text-interactive";
  return (
    <span className={`text-[13px] font-bold ${color} leading-none`}>
      {name.charAt(0)}
    </span>
  );
}

// ─── Arrow icons ─────────────────────────────────────────────────────────────
function ChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─── Pulse badge icon ────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
    </span>
  );
}

// ─── Tab type ────────────────────────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  count: number;
  products: Product[];
  href: string;      // "View all" link destination
  hrefLabel: string; // "View all" link text
}

export function InStockShowcase({ groups, allProducts, totalInStock }: InStockShowcaseProps) {
  // Build tab data
  const tabs: Tab[] = [
    {
      id: "all",
      label: "All Makes",
      count: totalInStock,
      products: allProducts,
      href: "/shop?inStockOnly=true",
      hrefLabel: "Browse all in-stock parts",
    },
    ...groups.map((g) => ({
      id: g.slug,
      label: g.name,
      count: g.products.length,
      products: g.products.slice(0, 16), // Cap at 16 for carousel
      href: `/vehicles/${g.slug}`,
      hrefLabel: `View all ${g.name} parts`,
    })),
  ];

  const [activeTab, setActiveTab] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  // ─── Scroll state tracker ──────────────────────────────────────────
  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    const ro = new ResizeObserver(updateScrollButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      ro.disconnect();
    };
  }, [activeTab, updateScrollButtons]);

  // ─── Scroll by one "page" ──────────────────────────────────────────
  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // ─── Tab switch with fade ──────────────────────────────────────────
  const switchTab = useCallback((tabId: string) => {
    if (tabId === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      // Reset scroll position
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      setTimeout(() => setIsTransitioning(false), 30);
    }, 120);
  }, [activeTab]);

  return (
    <div>
      {/* ── Header row: Title + live badge ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h2 className="text-[22px] font-semibold text-text-primary">
              In Stock Now
            </h2>
            <PulseDot />
          </div>
          <p className="text-[14px] text-text-secondary">
            {totalInStock}+ genuine OEM parts ready to ship
          </p>
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1" role="tablist" aria-label="Filter by vehicle make">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => switchTab(tab.id)}
              className={`stock-tab group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "stock-tab-active bg-interactive text-text-inverse shadow-sm shadow-interactive/20"
                  : "bg-surface-secondary text-text-secondary hover:bg-interactive-subtle hover:text-interactive"
              }`}
            >
              {/* Make initial for non-"all" tabs */}
              {tab.id !== "all" && (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors duration-200 ${
                  isActive ? "bg-white/20 text-text-inverse" : "bg-white text-text-secondary group-hover:text-interactive"
                }`}>
                  {tab.label.charAt(0)}
                </span>
              )}
              {tab.id === "all" && (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
              <span>{tab.label}</span>
              <span className={`text-[12px] px-1.5 py-0.5 rounded-full leading-none font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-white/20 text-text-inverse"
                  : "bg-white text-text-disabled group-hover:text-interactive"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Carousel ───────────────────────────────────────────────────── */}
      <div
        id={`panel-${currentTab.id}`}
        role="tabpanel"
        aria-label={`${currentTab.label} products`}
        className="relative"
      >
        {/* Arrow left */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="carousel-arrow absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </button>
        )}

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className={`flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 transition-opacity duration-150 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{ scrollPaddingInline: "0px" }}
        >
          {currentTab.products.length > 0 ? (
            currentTab.products.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            /* Empty state */
            <div className="w-full py-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-[15px] font-medium text-text-secondary mb-1">
                No {currentTab.label} parts in stock right now
              </p>
              <p className="text-[13px] text-text-disabled">
                Check back soon or{" "}
                <a
                  href="https://wa.me/971551521264?text=Hi%2C%20I%20need%20help%20finding%20an%20engine%20part."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-interactive hover:underline"
                >
                  send us a WhatsApp
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Arrow right */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="carousel-arrow absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight />
          </button>
        )}

        {/* Scroll indicator dots (mobile) */}
        {currentTab.products.length > 2 && (
          <div className="flex items-center justify-center gap-1 mt-3 lg:hidden" aria-hidden="true">
            <span className="w-6 h-1 rounded-full bg-interactive" />
            <span className="w-1.5 h-1 rounded-full bg-border" />
            <span className="w-1.5 h-1 rounded-full bg-border" />
          </div>
        )}
      </div>

      {/* ── Footer: View All link ──────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-6">
        <a
          href={currentTab.href}
          className="btn btn-secondary text-[14px]"
        >
          {currentTab.hrefLabel} →
        </a>
        {currentTab.products.length > 0 && (
          <span className="text-[13px] text-text-disabled hidden sm:inline">
            Showing {Math.min(currentTab.products.length, 16)} of {currentTab.count}
          </span>
        )}
      </div>
    </div>
  );
}
