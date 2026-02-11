"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearch, POPULAR_SEARCHES } from "@/lib/use-search";
import { highlightMatch, type HighlightSegment } from "@/lib/search-engine";

// ─── Variant type ───────────────────────────────────────────────────────────

type SearchVariant = "hero" | "header" | "mobile";

interface UnifiedSearchProps {
  variant?: SearchVariant;
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

// ─── Rotating placeholders (hero only) ──────────────────────────────────────

const HERO_PLACEHOLDERS = [
  "89661-F0B00",
  "1GD turbocharger",
  "Hilux crankshaft",
  "YD25 injector",
  "WL alternator",
  "4D56 gasket kit",
];

// ─── Shared Icons ───────────────────────────────────────────────────────────

function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M17 16V9a1 1 0 00-1-1h-2l-3 8" />
      <line x1="5" y1="16" x2="9" y2="16" strokeWidth={1.5} strokeLinecap="round" />
      <line x1="15" y1="16" x2="19" y2="16" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function CpuIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-3.5 h-3.5 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─── Highlight ──────────────────────────────────────────────────────────────

function Highlight({ segments }: { segments: HighlightSegment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.highlighted ? (
          <mark key={i} className="search-highlight">{seg.text}</mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

// ─── Product Thumbnail ──────────────────────────────────────────────────────

function ProductThumb({ src, alt, size = 40 }: { src: string; alt: string; size?: number }) {
  const [err, setErr] = useState(false);
  const px = `${size}px`;
  if (!src || err) {
    return (
      <div
        className="rounded-lg bg-surface-secondary flex items-center justify-center shrink-0"
        style={{ width: px, height: px }}
      >
        <svg className="w-5 h-5 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="rounded-lg bg-surface-secondary overflow-hidden shrink-0 relative"
      style={{ width: px, height: px }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={px}
        className="object-contain p-0.5"
        onError={() => setErr(true)}
        unoptimized={src.startsWith("/images/")}
      />
    </div>
  );
}

// ─── Query Type Badge ───────────────────────────────────────────────────────

function QueryTypeBadge({ type }: { type: "oem" | "engine" | "general" }) {
  if (type === "general") return null;
  const config = {
    oem: { label: "OEM", bg: "bg-interactive/10", text: "text-interactive", border: "border-interactive/20" },
    engine: { label: "Engine", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  };
  const c = config[type];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded ${c.bg} ${c.text} border ${c.border} tracking-wide uppercase shrink-0`}>
      {c.label}
    </span>
  );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────

function SearchSkeleton() {
  return (
    <div className="p-3 space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-secondary" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-surface-secondary rounded w-3/4" />
            <div className="h-2.5 bg-surface-secondary rounded w-1/2" />
          </div>
          <div className="h-3.5 bg-surface-secondary rounded w-16" />
        </div>
      ))}
    </div>
  );
}

// ─── Typewriter Placeholder Hook (hero only) ─────────────────────────────────

function useTypewriter(phrases: string[], typingSpeed = 50, deleteSpeed = 30, holdTime = 2200) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIdx <= phrase.length) {
      if (charIdx === phrase.length) {
        // Hold before deleting
        timeout = setTimeout(() => setIsDeleting(true), holdTime);
      } else {
        timeout = setTimeout(() => {
          setDisplay(phrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, typingSpeed);
      }
    } else if (isDeleting && charIdx >= 0) {
      if (charIdx === 0) {
        setIsDeleting(false);
        setPhraseIdx((p) => (p + 1) % phrases.length);
        setDisplay("");
      } else {
        timeout = setTimeout(() => {
          setDisplay(phrase.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, deleteSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx, phrases, typingSpeed, deleteSpeed, holdTime]);

  return display;
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export function UnifiedSearch({
  variant = "header",
  onClose,
  autoFocus = false,
  className = "",
}: UnifiedSearchProps) {
  const isMobile = variant === "mobile";
  const isHero = variant === "hero";
  const isHeader = variant === "header";

  const search = useSearch({
    enableShortcut: isHeader,
    enableClickOutside: !isMobile,
    maxProducts: isMobile ? 3 : 4,
    onClose,
  });

  const typewriterText = useTypewriter(HERO_PLACEHOLDERS);

  // Auto-focus
  useEffect(() => {
    if (autoFocus && search.inputRef.current) {
      setTimeout(() => search.inputRef.current?.focus(), 50);
    }
  }, [autoFocus]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hero auto-focus on desktop
  useEffect(() => {
    if (isHero && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setTimeout(() => search.inputRef.current?.focus(), 100);
    }
  }, [isHero]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── MOBILE FULLSCREEN ──────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="search-fullscreen">
        {/* Header bar */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border bg-white safe-area-top">
          <SearchIcon className="w-5 h-5 text-text-disabled shrink-0" />
          <form onSubmit={search.handleSubmit} className="flex-1">
            <input
              ref={search.inputRef}
              type="text"
              value={search.query}
              onChange={(e) => search.handleInputChange(e.target.value)}
              onKeyDown={search.handleKeyDown}
              placeholder="Search parts, OEM numbers, engines…"
              aria-label="Search for engine parts"
              autoFocus
              className="w-full text-[16px] text-text-primary bg-transparent outline-none placeholder:text-text-disabled"
            />
          </form>
          {search.query && (
            <QueryTypeBadge type={search.queryType} />
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            aria-label="Close search"
          >
            <XIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 overscroll-contain">
          {search.isLoading && <SearchSkeleton />}
          {search.showEmptyState && (
            <EmptyState
              recentSearches={search.recentSearches}
              onRecentClick={search.handleRecentClick}
              onPopularClick={search.handlePopularClick}
              onClearRecent={search.handleClearRecent}
            />
          )}
          {search.showNoResults && <NoResults query={search.query} />}
          {search.showResults && search.results && (
            <ResultsList
              results={search.results}
              query={search.query}
              activeIndex={search.activeIndex}
              onNavigate={search.navigateTo}
              maxProducts={3}
              mobile
            />
          )}
        </div>
      </div>
    );
  }

  // ─── HERO VARIANT ────────────────────────────────────────────────────
  if (isHero) {
    return (
      <div ref={search.containerRef} className={`relative w-full max-w-xl mx-auto ${className}`}>
        <form onSubmit={search.handleSubmit} role="search">
          <div className={`search-hero-input flex rounded-2xl overflow-hidden shadow-lg shadow-black/25 ring-1 ring-white/10 transition-all duration-300 ${
            search.isOpen ? "ring-2 ring-interactive/50 shadow-interactive/10" : "focus-within:ring-2 focus-within:ring-interactive/40"
          }`}>
            <div className="relative flex-1 flex items-center">
              <div className="pl-4 pr-1 flex items-center pointer-events-none">
                <SearchIcon className={`w-5 h-5 transition-all duration-200 ${search.isOpen ? "text-interactive scale-110" : "text-text-disabled"}`} />
              </div>
              <input
                ref={search.inputRef}
                type="text"
                value={search.query}
                onChange={(e) => search.handleInputChange(e.target.value)}
                onFocus={search.handleFocus}
                onKeyDown={search.handleKeyDown}
                placeholder={search.query ? "" : ""}
                aria-label="Search for engine parts by name, OEM number, or engine code"
                aria-expanded={search.isOpen}
                aria-controls="hero-search-listbox"
                aria-autocomplete="list"
                role="combobox"
                autoComplete="off"
                className="w-full h-[52px] px-2 bg-white text-text-primary text-[16px] border-0 outline-none placeholder:text-transparent"
              />
              {/* Typewriter placeholder overlay */}
              {!search.query && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1 text-[16px] text-text-disabled/60">
                  <span>Search: </span>
                  <span className="font-mono">{typewriterText}</span>
                  <span className="typewriter-cursor">|</span>
                </div>
              )}
              {/* Query type badge */}
              {search.query && search.queryType !== "general" && (
                <div className="pr-2">
                  <QueryTypeBadge type={search.queryType} />
                </div>
              )}
              {/* Clear button */}
              {search.query && (
                <button
                  type="button"
                  onClick={() => { search.handleInputChange(""); search.inputRef.current?.focus(); }}
                  className="mr-1 p-1 rounded-md text-text-disabled hover:text-text-secondary transition-colors"
                  aria-label="Clear search"
                >
                  <XIcon />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 h-[52px] bg-interactive hover:bg-interactive-hover text-text-inverse transition-colors shrink-0 flex items-center gap-2"
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-[15px] font-semibold">Search</span>
            </button>
          </div>
        </form>

        {/* Dropdown */}
        {search.isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="search-backdrop"
              onClick={search.closeSearch}
              aria-hidden="true"
            />
            <div
              id="hero-search-listbox"
              role="listbox"
              className="search-dropdown absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl shadow-black/15 border border-border/60 overflow-hidden z-50"
            >
              {search.isLoading && <SearchSkeleton />}
              {search.showEmptyState && (
                <div className="p-4">
                  <EmptyState
                    recentSearches={search.recentSearches}
                    onRecentClick={search.handleRecentClick}
                    onPopularClick={search.handlePopularClick}
                    onClearRecent={search.handleClearRecent}
                  />
                </div>
              )}
              {search.showNoResults && (
                <div className="p-4">
                  <NoResults query={search.query} />
                </div>
              )}
              {search.showResults && search.results && (
                <ResultsList
                  results={search.results}
                  query={search.query}
                  activeIndex={search.activeIndex}
                  onNavigate={search.navigateTo}
                  maxProducts={4}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // ─── HEADER VARIANT ──────────────────────────────────────────────────
  return (
    <div ref={search.containerRef} className={`relative ${className}`}>
      <form onSubmit={search.handleSubmit} className="relative" role="search">
        <div className={`search-header-input flex items-center rounded-lg bg-white overflow-hidden transition-all duration-200 ${
          search.isOpen ? "ring-2 ring-interactive/40 shadow-md" : "ring-1 ring-transparent"
        }`}>
          <div className="pl-3 flex items-center pointer-events-none">
            <SearchIcon className={`w-4 h-4 transition-all duration-200 ${search.isOpen ? "text-interactive" : "text-text-disabled"}`} />
          </div>
          <input
            ref={search.inputRef}
            type="text"
            value={search.query}
            onChange={(e) => search.handleInputChange(e.target.value)}
            onKeyDown={search.handleKeyDown}
            onFocus={search.handleFocus}
            placeholder="Search parts, OEM numbers, engines…"
            aria-label="Search for engine parts"
            aria-expanded={search.isOpen}
            aria-controls="search-dropdown"
            aria-autocomplete="list"
            role="combobox"
            autoComplete="off"
            className="w-full px-2 py-2 text-[14px] text-text-primary bg-transparent border-0 outline-none placeholder:text-text-disabled"
          />
          {/* Query type badge */}
          {search.query && search.queryType !== "general" && (
            <QueryTypeBadge type={search.queryType} />
          )}
          {/* Ctrl+K shortcut badge */}
          {!search.query && (
            <div className="hidden lg:flex items-center gap-0.5 mr-2 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-disabled bg-surface-secondary rounded border border-border/60">
                Ctrl
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-disabled bg-surface-secondary rounded border border-border/60">
                K
              </kbd>
            </div>
          )}
          {/* Clear button */}
          {search.query && (
            <button
              type="button"
              onClick={() => { search.handleInputChange(""); search.inputRef.current?.focus(); }}
              className="mr-1 p-1 rounded text-text-disabled hover:text-text-secondary transition-colors"
              aria-label="Clear search"
            >
              <XIcon />
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-2 bg-interactive hover:bg-interactive-hover text-text-inverse transition-colors shrink-0 rounded-r-lg"
            aria-label="Search"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {search.isOpen && (
        <>
          {/* Backdrop dim */}
          <div
            className="search-backdrop"
            onClick={search.closeSearch}
            aria-hidden="true"
          />
          <div
            id="search-dropdown"
            role="listbox"
            className="search-dropdown absolute top-full left-0 mt-2 bg-surface-elevated rounded-xl shadow-xl border border-border/80 overflow-hidden z-50 w-full min-w-[420px] lg:min-w-[540px]"
          >
            {search.isLoading && <SearchSkeleton />}
            {search.showEmptyState && (
              <div className="p-4">
                <EmptyState
                  recentSearches={search.recentSearches}
                  onRecentClick={search.handleRecentClick}
                  onPopularClick={search.handlePopularClick}
                  onClearRecent={search.handleClearRecent}
                />
              </div>
            )}
            {search.showNoResults && (
              <div className="p-4">
                <NoResults query={search.query} />
              </div>
            )}
            {search.showResults && search.results && (
              <ResultsList
                results={search.results}
                query={search.query}
                activeIndex={search.activeIndex}
                onNavigate={search.navigateTo}
                maxProducts={4}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyState({
  recentSearches,
  onRecentClick,
  onPopularClick,
  onClearRecent,
}: {
  recentSearches: string[];
  onRecentClick: (term: string) => void;
  onPopularClick: (term: string) => void;
  onClearRecent: () => void;
}) {
  return (
    <div className="space-y-4">
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">
              Recent searches
            </span>
            <button
              onClick={onClearRecent}
              className="text-[11px] text-text-disabled hover:text-status-danger transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-0.5">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => onRecentClick(term)}
                className="search-result-item flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-[13px] text-text-primary hover:bg-surface-secondary transition-colors"
              >
                <span className="text-text-disabled"><ClockIcon /></span>
                <span className="flex-1 truncate">{term}</span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <span className="flex items-center gap-1.5 mb-2.5 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">
          <TrendingIcon />
          Popular searches
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => onPopularClick(term)}
              className="px-3 py-1.5 text-[12px] font-medium rounded-full border border-border text-text-secondary bg-white hover:border-interactive/50 hover:text-interactive hover:bg-interactive/5 transition-all duration-150"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── No Results ─────────────────────────────────────────────────────────────

function NoResults({ query }: { query: string }) {
  return (
    <div className="text-center py-10">
      <div className="w-14 h-14 rounded-2xl bg-surface-secondary flex items-center justify-center mx-auto mb-4">
        <SearchIcon className="w-7 h-7 text-text-disabled" />
      </div>
      <p className="text-[15px] font-semibold text-text-primary mb-1.5">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="text-[13px] text-text-secondary max-w-xs mx-auto leading-relaxed">
        Try a different OEM part number, engine code (e.g. 1GD-FTV), or part name like &ldquo;turbocharger&rdquo;
      </p>
    </div>
  );
}

// ─── Results List ───────────────────────────────────────────────────────────

function ResultsList({
  results,
  query,
  activeIndex,
  onNavigate,
  maxProducts = 4,
  mobile = false,
}: {
  results: NonNullable<ReturnType<typeof useSearch>["results"]>;
  query: string;
  activeIndex: number;
  onNavigate: (url: string, searchQuery?: string) => void;
  maxProducts?: number;
  mobile?: boolean;
}) {
  let idx = 0;
  const products = results.products.slice(0, maxProducts);
  const categories = results.categories.slice(0, mobile ? 1 : 2);
  const engines = results.engineCodes.slice(0, mobile ? 1 : 2);
  const vehicles = results.vehicles.slice(0, mobile ? 1 : 2);
  const partTypes = results.partTypes.slice(0, mobile ? 1 : 2);
  const thumbSize = mobile ? 36 : 40;
  const itemPy = mobile ? "py-3" : "py-2.5";

  return (
    <div className="search-results-list">
      {/* Products */}
      {products.length > 0 && (
        <div className="py-1.5">
          <SectionHeader icon={<WrenchIcon />} label="Products" count={results.totalProducts} />
          {products.map((p) => {
            const ci = idx++;
            return (
              <button
                key={p.id}
                onClick={() => onNavigate(`/product/${p.slug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 ${itemPy} transition-colors ${
                  ci === activeIndex ? "bg-interactive/8 border-l-2 border-l-interactive" : "hover:bg-surface-secondary border-l-2 border-l-transparent"
                }`}
                role="option"
                aria-selected={ci === activeIndex}
              >
                <ProductThumb src={p.imageUrl} alt={p.name} size={thumbSize} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary leading-tight truncate">
                    <Highlight segments={highlightMatch(p.name, query)} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {p.sku && (
                      <span className="text-[11px] font-mono text-text-disabled truncate max-w-[120px]">
                        {p.sku}
                      </span>
                    )}
                    {p.categoryName && (
                      <span className="text-[11px] italic text-text-disabled">
                        in {p.categoryName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-0.5">
                  <span className="text-[13px] font-semibold font-numeric text-text-primary whitespace-nowrap">
                    {p.price}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] ${
                    p.inStock ? "text-status-success" : "text-text-disabled"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-status-success" : "bg-text-disabled"}`} />
                    {p.inStock ? "In stock" : "On order"}
                  </span>
                </div>
              </button>
            );
          })}
          {results.totalProducts > maxProducts && (() => {
            const ci = idx++;
            return (
              <button
                key="viewall"
                onClick={() => onNavigate(`/shop?search=${encodeURIComponent(query)}`, query)}
                className={`search-result-item flex items-center justify-between w-full px-3 py-2.5 transition-colors ${
                  ci === activeIndex ? "bg-interactive/8" : "hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={ci === activeIndex}
              >
                <span className="text-[13px] font-semibold text-interactive">
                  View all {results.totalProducts} results
                </span>
                <ChevronRight />
              </button>
            );
          })()}
          <Divider />
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="py-1.5">
          <SectionHeader icon={<FolderIcon />} label="Categories" />
          {categories.map((c) => {
            const ci = idx++;
            return (
              <button
                key={c.id}
                onClick={() => onNavigate(`/shop?categoryId=${c.id}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 ${itemPy} transition-colors ${
                  ci === activeIndex ? "bg-interactive/8 border-l-2 border-l-interactive" : "hover:bg-surface-secondary border-l-2 border-l-transparent"
                }`}
                role="option"
                aria-selected={ci === activeIndex}
              >
                <div className="w-8 h-8 rounded-lg bg-interactive/8 flex items-center justify-center shrink-0 text-interactive">
                  <FolderIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">
                    <Highlight segments={highlightMatch(c.name, query)} />
                  </div>
                </div>
                <span className="text-[12px] text-text-disabled shrink-0">{c.count} parts</span>
              </button>
            );
          })}
          <Divider />
        </div>
      )}

      {/* Engine Codes */}
      {engines.length > 0 && (
        <div className="py-1.5">
          <SectionHeader icon={<CpuIcon />} label="Engine Codes" />
          {engines.map((e) => {
            const ci = idx++;
            return (
              <button
                key={e.code + e.modelSlug}
                onClick={() => onNavigate(`/vehicles/${e.makeSlug}/${e.modelSlug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 ${itemPy} transition-colors ${
                  ci === activeIndex ? "bg-interactive/8 border-l-2 border-l-interactive" : "hover:bg-surface-secondary border-l-2 border-l-transparent"
                }`}
                role="option"
                aria-selected={ci === activeIndex}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 text-amber-600">
                  <CpuIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="badge-engine text-[12px] font-mono font-semibold px-2 py-0.5">
                    <Highlight segments={highlightMatch(e.code, query)} />
                  </span>
                  <span className="ml-2 text-[12px] text-text-secondary">{e.displacement} {e.fuel}</span>
                </div>
                <span className="text-[12px] text-text-disabled shrink-0">{e.make} {e.model}</span>
              </button>
            );
          })}
          <Divider />
        </div>
      )}

      {/* Vehicles */}
      {vehicles.length > 0 && (
        <div className="py-1.5">
          <SectionHeader icon={<CarIcon />} label="Vehicles" />
          {vehicles.map((v) => {
            const ci = idx++;
            return (
              <button
                key={v.makeSlug + v.modelSlug}
                onClick={() => onNavigate(`/vehicles/${v.makeSlug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 ${itemPy} transition-colors ${
                  ci === activeIndex ? "bg-interactive/8 border-l-2 border-l-interactive" : "hover:bg-surface-secondary border-l-2 border-l-transparent"
                }`}
                role="option"
                aria-selected={ci === activeIndex}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <CarIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">
                    <Highlight segments={highlightMatch(`${v.makeName} ${v.modelName}`, query)} />
                  </div>
                </div>
                <span className="text-[12px] text-text-disabled shrink-0">
                  {v.engineCount} engine{v.engineCount > 1 ? "s" : ""}
                </span>
              </button>
            );
          })}
          <Divider />
        </div>
      )}

      {/* Part Types */}
      {partTypes.length > 0 && (
        <div className="py-1.5">
          <SectionHeader icon={<WrenchIcon />} label="Part Types" />
          {partTypes.map((pt) => {
            const ci = idx++;
            return (
              <button
                key={pt.slug}
                onClick={() => onNavigate(`/shop?partType=${pt.slug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 ${itemPy} transition-colors ${
                  ci === activeIndex ? "bg-interactive/8 border-l-2 border-l-interactive" : "hover:bg-surface-secondary border-l-2 border-l-transparent"
                }`}
                role="option"
                aria-selected={ci === activeIndex}
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                  <WrenchIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">
                    <Highlight segments={highlightMatch(pt.name, query)} />
                  </div>
                </div>
                <ChevronRight />
              </button>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="px-3 py-2 border-t border-border/40 bg-surface-secondary/30">
        <div className="flex items-center justify-between text-[11px] text-text-disabled">
          <span className="hidden sm:inline">
            <kbd className="px-1 py-0.5 font-mono bg-surface-secondary rounded border border-border/60 text-[10px]">↑↓</kbd>
            {" "}navigate{" "}
            <kbd className="px-1 py-0.5 font-mono bg-surface-secondary rounded border border-border/60 text-[10px]">↵</kbd>
            {" "}select{" "}
            <kbd className="px-1 py-0.5 font-mono bg-surface-secondary rounded border border-border/60 text-[10px]">esc</kbd>
            {" "}close
          </span>
          <span className="sm:hidden text-[11px]">↑↓ navigate · ↵ select · esc close</span>
          <span>{results.totalProducts} total match{results.totalProducts !== 1 ? "es" : ""}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Utility Sub-components ─────────────────────────────────────────────────

function SectionHeader({ icon, label, count }: { icon: React.ReactNode; label: string; count?: number }) {
  return (
    <div className="flex items-center gap-2 px-3 pt-2 pb-1">
      <span className="text-text-disabled">{icon}</span>
      <span className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">
        {label}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-[10px] text-text-disabled bg-surface-secondary px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

function Divider() {
  return <div className="mx-3 my-1 border-t border-border/30" />;
}
