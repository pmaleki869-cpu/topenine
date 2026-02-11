"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  instantSearch,
  highlightMatch,
  addRecentSearch,
  getRecentSearches,
  POPULAR_SEARCHES,
  type InstantSearchResults,
  type HighlightSegment,
} from "@/lib/search-engine";

const PLACEHOLDERS = [
  "Search: 89661-F0B00",
  "Search: 1GD turbocharger",
  "Search: Hilux crankshaft",
  "Search: YD25 injector",
  "Search: WL alternator",
];

// ─── Tiny sub-components ────────────────────────────────────────────────────

function HL({ segments }: { segments: HighlightSegment[] }) {
  return (
    <>
      {segments.map((s, i) =>
        s.highlighted ? (
          <mark key={i} className="search-highlight">{s.text}</mark>
        ) : (
          <span key={i}>{s.text}</span>
        )
      )}
    </>
  );
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <div className="w-9 h-9 rounded bg-surface-secondary flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded bg-surface-secondary overflow-hidden shrink-0 relative">
      <Image src={src} alt={alt} fill sizes="36px" className="object-contain p-0.5" onError={() => setErr(true)} unoptimized={src.startsWith("/images/")} />
    </div>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────

const ClockSvg = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TrendSvg = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const FolderSvg = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);
const CpuSvg = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);
const ChevronSvg = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

/**
 * HeroSearch — large, auto-focused search bar with rotating placeholder text
 * AND an instant-search dropdown that appears as the user types.
 * Used exclusively in the homepage hero. 52px height, max-w-xl.
 */
export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState<InstantSearchResults | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Rotate placeholder every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
        setFade(true);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus on desktop
  useEffect(() => {
    if (window.innerWidth >= 1024 && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Click-outside close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    setActiveIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) {
      setResults(null);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setResults(instantSearch(value));
    }, 150);
  }, []);

  // Build flat navigable items
  const flatItems = useCallback((): { url: string }[] => {
    if (!results) return [];
    const items: { url: string }[] = [];
    for (const p of results.products) items.push({ url: `/product/${p.slug}` });
    if (results.totalProducts > 5) items.push({ url: `/shop?search=${encodeURIComponent(results.query)}` });
    for (const c of results.categories) items.push({ url: `/shop?categoryId=${c.id}` });
    for (const e of results.engineCodes) items.push({ url: `/vehicles/${e.makeSlug}/${e.modelSlug}` });
    for (const v of results.vehicles) items.push({ url: `/vehicles/${v.makeSlug}` });
    for (const pt of results.partTypes) items.push({ url: `/shop?partType=${pt.slug}` });
    return items;
  }, [results]);

  const navigateTo = useCallback(
    (url: string, term?: string) => {
      if (term) addRecentSearch(term);
      else if (query.trim()) addRecentSearch(query.trim());
      setIsOpen(false);
      setQuery("");
      setResults(null);
      setActiveIndex(-1);
      router.push(url);
    },
    [query, router]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) navigateTo(`/shop?search=${encodeURIComponent(trimmed)}`, trimmed);
    },
    [query, navigateTo]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const items = flatItems();
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((p) => (p < items.length - 1 ? p + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((p) => (p > 0 ? p - 1 : items.length - 1));
          break;
        case "Enter":
          if (activeIndex >= 0 && activeIndex < items.length) {
            e.preventDefault();
            navigateTo(items[activeIndex].url);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [flatItems, activeIndex, navigateTo]
  );

  const handleFocus = useCallback(() => {
    setIsOpen(true);
    setRecentSearches(getRecentSearches());
  }, []);

  const hasResults = results && (
    results.products.length > 0 ||
    results.categories.length > 0 ||
    results.engineCodes.length > 0 ||
    results.vehicles.length > 0 ||
    results.partTypes.length > 0
  );

  let itemCounter = 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto" role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-controls="hero-search-listbox">
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-xl overflow-hidden shadow-lg shadow-black/20 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-interactive/60 transition-all duration-200">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              className={`w-full h-[52px] px-5 bg-white text-text-primary text-[16px] border-0 outline-none transition-opacity duration-200 placeholder:text-text-disabled/70 ${
                fade ? "placeholder:opacity-100" : "placeholder:opacity-0"
              }`}
              aria-label="Search for engine parts by name, OEM number, or engine code"
              aria-autocomplete="list"
              aria-controls="hero-search-listbox"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="px-5 h-[52px] bg-interactive hover:bg-interactive-hover text-text-inverse transition-colors shrink-0 flex items-center gap-2"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline text-[15px] font-semibold">Search</span>
          </button>
        </div>
      </form>

      {/* ── Dropdown ──────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          id="hero-search-listbox"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl shadow-black/20 border border-border/60 overflow-hidden z-50 search-dropdown"
          style={{ animation: "search-dropdown-in 150ms ease-out" }}
        >
          {/* Empty state — recent / popular */}
          {!results && query.length < 2 && (
            <div className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
              {recentSearches.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider mb-2">Recent Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => { handleInputChange(term); setQuery(term); inputRef.current?.focus(); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] rounded-full bg-surface-secondary text-text-secondary hover:bg-interactive-subtle hover:text-interactive transition-colors"
                      >
                        <ClockSvg /> {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider mb-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => { handleInputChange(term); setQuery(term); inputRef.current?.focus(); }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] rounded-full bg-surface-secondary text-text-secondary hover:bg-interactive-subtle hover:text-interactive transition-colors"
                    >
                      <TrendSvg /> {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No results */}
          {results && !hasResults && (
            <div className="p-6 text-center">
              <p className="text-[14px] text-text-secondary mb-1">No results for &ldquo;<span className="font-semibold text-text-primary">{results.query}</span>&rdquo;</p>
              <p className="text-[13px] text-text-disabled">Try a different keyword, OEM number, or engine code</p>
            </div>
          )}

          {/* Results */}
          {results && hasResults && (
            <div className="max-h-[50vh] overflow-y-auto divide-y divide-border/40">
              {/* Products */}
              {results.products.length > 0 && (
                <div className="py-2">
                  <p className="px-4 py-1 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">Products</p>
                  {results.products.map((p) => {
                    const idx = itemCounter++;
                    return (
                      <button
                        key={p.slug}
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigateTo(`/product/${p.slug}`)}
                        className={`search-result-item w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                        }`}
                      >
                        <Thumb src={p.imageUrl} alt={p.name} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-text-primary truncate">
                            <HL segments={highlightMatch(p.name, results.query)} />
                          </p>
                          <p className="text-[12px] text-text-disabled truncate">
                            {p.sku} · {p.categoryName}
                            {p.inStock && <span className="ml-1.5 text-emerald-600">● In Stock</span>}
                          </p>
                        </div>
                        {p.price && <span className="text-[14px] font-semibold text-interactive shrink-0">{p.price}</span>}
                        <ChevronSvg />
                      </button>
                    );
                  })}
                  {results.totalProducts > 5 && (() => {
                    const idx = itemCounter++;
                    return (
                      <button
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigateTo(`/shop?search=${encodeURIComponent(results.query)}`, results.query)}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                          idx === activeIndex ? "bg-interactive-subtle text-interactive" : "text-interactive hover:bg-interactive-subtle/50"
                        }`}
                      >
                        View all {results.totalProducts} results
                        <ChevronSvg />
                      </button>
                    );
                  })()}
                </div>
              )}

              {/* Categories */}
              {results.categories.length > 0 && (
                <div className="py-2">
                  <p className="px-4 py-1 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">Categories</p>
                  {results.categories.map((c) => {
                    const idx = itemCounter++;
                    return (
                      <button
                        key={c.id}
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigateTo(`/shop?categoryId=${c.id}`)}
                        className={`search-result-item w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                        }`}
                      >
                        <div className="w-9 h-9 rounded bg-interactive-subtle flex items-center justify-center shrink-0 text-interactive"><FolderSvg /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-text-primary truncate"><HL segments={highlightMatch(c.name, results.query)} /></p>
                          <p className="text-[12px] text-text-disabled">{c.count} products</p>
                        </div>
                        <ChevronSvg />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Engine Codes */}
              {results.engineCodes.length > 0 && (
                <div className="py-2">
                  <p className="px-4 py-1 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">Engine Codes</p>
                  {results.engineCodes.map((ec) => {
                    const idx = itemCounter++;
                    return (
                      <button
                        key={ec.code}
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigateTo(`/vehicles/${ec.makeSlug}/${ec.modelSlug}`)}
                        className={`search-result-item w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                        }`}
                      >
                        <div className="w-9 h-9 rounded bg-amber-50 flex items-center justify-center shrink-0 text-amber-600"><CpuSvg /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-text-primary"><HL segments={highlightMatch(ec.code, results.query)} /></p>
                          <p className="text-[12px] text-text-disabled">{ec.make} {ec.model}</p>
                        </div>
                        <ChevronSvg />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Vehicles */}
              {results.vehicles.length > 0 && (
                <div className="py-2">
                  <p className="px-4 py-1 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">Vehicles</p>
                  {results.vehicles.map((v) => {
                    const idx = itemCounter++;
                    return (
                      <button
                        key={`${v.makeSlug}-${v.modelName}`}
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigateTo(`/vehicles/${v.makeSlug}`)}
                        className={`search-result-item w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                        }`}
                      >
                        <div className="w-9 h-9 rounded bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M17 16V9a1 1 0 00-1-1h-2l-3 8" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-text-primary"><HL segments={highlightMatch(`${v.makeName} ${v.modelName}`, results.query)} /></p>
                        </div>
                        <ChevronSvg />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Part Types */}
              {results.partTypes.length > 0 && (
                <div className="py-2">
                  <p className="px-4 py-1 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">Part Types</p>
                  {results.partTypes.map((pt) => {
                    const idx = itemCounter++;
                    return (
                      <button
                        key={pt.slug}
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigateTo(`/shop?partType=${pt.slug}`)}
                        className={`search-result-item w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                        }`}
                      >
                        <div className="w-9 h-9 rounded bg-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-text-primary"><HL segments={highlightMatch(pt.name, results.query)} /></p>
                        </div>
                        <ChevronSvg />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Footer hint */}
              <div className="px-4 py-2 bg-surface-secondary/50 flex items-center justify-between text-[11px] text-text-disabled">
                <span>↑↓ navigate · ↵ select · esc close</span>
                <span>{results.totalProducts} total match{results.totalProducts !== 1 ? "es" : ""}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
