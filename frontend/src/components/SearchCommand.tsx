"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  instantSearch,
  highlightMatch,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  POPULAR_SEARCHES,
  type InstantSearchResults,
  type HighlightSegment,
} from "@/lib/search-engine";

// ─── Sub-components ─────────────────────────────────────────────────────────

function Highlight({ segments }: { segments: HighlightSegment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.highlighted ? (
          <mark key={i} className="search-highlight">
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

function ProductThumb({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <div className="w-10 h-10 rounded-md bg-surface-secondary flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-md bg-surface-secondary overflow-hidden shrink-0 relative">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="40px"
        className="object-contain p-0.5"
        onError={() => setErr(true)}
        unoptimized={src.startsWith("/images/")}
      />
    </div>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────

function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

function ArrowRightIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

// ─── Main Component ─────────────────────────────────────────────────────────

interface SearchCommandProps {
  /** If true, render as fullscreen mobile overlay */
  mobile?: boolean;
  /** Callback to close mobile overlay */
  onClose?: () => void;
  /** Additional class on the root wrapper */
  className?: string;
  /** If true, the input will auto-focus on mount */
  autoFocus?: boolean;
  /** Dropdown width class override (e.g. for HeroSearch) */
  dropdownClass?: string;
}

export function SearchCommand({
  mobile = false,
  onClose,
  className = "",
  autoFocus = false,
  dropdownClass,
}: SearchCommandProps) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState<InstantSearchResults | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setQuery("");
    setResults(null);
    setActiveIndex(-1);
  }, [pathname]);

  // Auto-focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Click-outside handler (desktop only)
  useEffect(() => {
    if (mobile) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobile]);

  // Ctrl+K / Cmd+K global shortcut (only for non-mobile instances)
  useEffect(() => {
    if (mobile) return;

    function handleGlobalKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
        setRecentSearches(getRecentSearches());
      }
    }
    document.addEventListener("keydown", handleGlobalKey);
    return () => document.removeEventListener("keydown", handleGlobalKey);
  }, [mobile]);

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
      const r = instantSearch(value);
      setResults(r);
    }, 150);
  }, []);

  // Build flat list of navigable items for keyboard
  const flatItems = useCallback((): { type: string; url: string; label: string }[] => {
    if (!results) return [];
    const items: { type: string; url: string; label: string }[] = [];

    for (const p of results.products) {
      items.push({ type: "product", url: `/product/${p.slug}`, label: p.name });
    }
    if (results.totalProducts > 5) {
      items.push({ type: "viewall", url: `/shop?search=${encodeURIComponent(results.query)}`, label: "View all results" });
    }
    for (const c of results.categories) {
      items.push({ type: "category", url: `/shop?categoryId=${c.id}`, label: c.name });
    }
    for (const e of results.engineCodes) {
      items.push({ type: "engine", url: `/vehicles/${e.makeSlug}/${e.modelSlug}`, label: e.code });
    }
    for (const v of results.vehicles) {
      items.push({ type: "vehicle", url: `/vehicles/${v.makeSlug}`, label: `${v.makeName} ${v.modelName}` });
    }
    for (const pt of results.partTypes) {
      items.push({ type: "parttype", url: `/shop?partType=${pt.slug}`, label: pt.name });
    }
    return items;
  }, [results]);

  // Navigate to an item
  const navigateTo = useCallback(
    (url: string, searchQuery?: string) => {
      if (searchQuery) addRecentSearch(searchQuery);
      else if (query.trim()) addRecentSearch(query.trim());

      setIsOpen(false);
      setQuery("");
      setResults(null);
      setActiveIndex(-1);
      router.push(url);
      if (onClose) onClose();
    },
    [query, router, onClose]
  );

  // Submit form → navigate to shop
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        navigateTo(`/shop?search=${encodeURIComponent(trimmed)}`, trimmed);
      }
    },
    [query, navigateTo]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      const items = flatItems();

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case "Enter":
          if (activeIndex >= 0 && activeIndex < items.length) {
            e.preventDefault();
            navigateTo(items[activeIndex].url);
          }
          // else let form submit handle it
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          if (onClose) onClose();
          break;
      }
    },
    [flatItems, activeIndex, navigateTo, onClose]
  );

  const handleFocus = useCallback(() => {
    setIsOpen(true);
    setRecentSearches(getRecentSearches());
  }, []);

  const handleRecentClick = useCallback(
    (term: string) => {
      setQuery(term);
      const r = instantSearch(term);
      setResults(r);
      setActiveIndex(-1);
      inputRef.current?.focus();
    },
    []
  );

  const handlePopularClick = useCallback(
    (term: string) => {
      setQuery(term);
      const r = instantSearch(term);
      setResults(r);
      setActiveIndex(-1);
    },
    []
  );

  const hasResults = results && (
    results.products.length > 0 ||
    results.categories.length > 0 ||
    results.engineCodes.length > 0 ||
    results.vehicles.length > 0 ||
    results.partTypes.length > 0
  );

  const showDropdown = isOpen;
  const showEmptyState = isOpen && !results && query.length < 2;
  const showNoResults = isOpen && results && !hasResults;
  const showResults = isOpen && results && hasResults;

  // Track the running item index for keyboard highlight
  let itemCounter = 0;

  // ─── Mobile Fullscreen ────────────────────────────────────────────────
  if (mobile) {
    return (
      <div className="search-fullscreen">
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border bg-white">
          <SearchIcon className="w-5 h-5 text-text-disabled shrink-0" />
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search parts, OEM numbers, engines…"
              aria-label="Search for engine parts"
              autoFocus
              className="w-full text-[16px] text-text-primary bg-transparent outline-none placeholder:text-text-disabled"
            />
          </form>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            aria-label="Close search"
          >
            <XIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Empty state: recent + popular */}
          {showEmptyState && (
            <EmptyState
              recentSearches={recentSearches}
              onRecentClick={handleRecentClick}
              onPopularClick={handlePopularClick}
              onClearRecent={() => { clearRecentSearches(); setRecentSearches([]); }}
            />
          )}

          {/* No results */}
          {showNoResults && (
            <NoResults query={query} />
          )}

          {/* Results */}
          {showResults && results && (
            <ResultsList
              results={results}
              query={query}
              activeIndex={activeIndex}
              itemCounter={0}
              onNavigate={navigateTo}
            />
          )}
        </div>
      </div>
    );
  }

  // ─── Desktop Inline ───────────────────────────────────────────────────
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative" role="search">
        <div className="flex items-center rounded-md bg-white overflow-hidden">
          <div className="pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-4 h-4 text-text-disabled" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Search parts, OEM numbers, engines…"
            aria-label="Search for engine parts"
            aria-expanded={isOpen}
            aria-controls="search-dropdown"
            aria-autocomplete="list"
            role="combobox"
            autoComplete="off"
            className="w-full px-2 py-2 text-[14px] text-text-primary bg-transparent border-0 outline-none placeholder:text-text-disabled"
          />
          {/* Shortcut badge */}
          {!query && (
            <div className="hidden lg:flex items-center gap-0.5 mr-2 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-disabled bg-surface-secondary rounded border border-border/60">
                Ctrl
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-disabled bg-surface-secondary rounded border border-border/60">
                K
              </kbd>
            </div>
          )}
          {/* Clear button when there's a query */}
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setResults(null); setActiveIndex(-1); inputRef.current?.focus(); }}
              className="mr-1 p-1 rounded text-text-disabled hover:text-text-secondary transition-colors"
              aria-label="Clear search"
            >
              <XIcon />
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-2 bg-interactive hover:bg-interactive-hover text-text-inverse transition-colors shrink-0"
            aria-label="Search"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Dropdown panel */}
      {showDropdown && (
        <div
          id="search-dropdown"
          role="listbox"
          className={`search-dropdown absolute top-full left-0 mt-2 bg-surface-elevated rounded-xl shadow-xl border border-border/80 max-h-[70vh] overflow-y-auto overflow-x-hidden z-50 ${
            dropdownClass || "w-full min-w-[400px] lg:min-w-[540px]"
          }`}
        >
          {/* Empty state */}
          {showEmptyState && (
            <div className="p-4">
              <EmptyState
                recentSearches={recentSearches}
                onRecentClick={handleRecentClick}
                onPopularClick={handlePopularClick}
                onClearRecent={() => { clearRecentSearches(); setRecentSearches([]); }}
              />
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <div className="p-4">
              <NoResults query={query} />
            </div>
          )}

          {/* Results */}
          {showResults && results && (
            <ResultsList
              results={results}
              query={query}
              activeIndex={activeIndex}
              itemCounter={itemCounter}
              onNavigate={navigateTo}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Empty State (recent + popular) ─────────────────────────────────────────

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
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">
              Recent searches
            </span>
            <button
              onClick={onClearRecent}
              className="text-[11px] text-text-disabled hover:text-status-danger transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="space-y-0.5">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => onRecentClick(term)}
                className="search-result-item flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg text-[13px] text-text-primary hover:bg-surface-secondary transition-colors"
              >
                <ClockIcon />
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <span className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-text-disabled uppercase tracking-wider">
          <TrendingIcon />
          Popular searches
        </span>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => onPopularClick(term)}
              className="px-2.5 py-1 text-[12px] font-medium rounded-full border border-border text-text-secondary bg-white hover:border-interactive/50 hover:text-interactive transition-colors"
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
    <div className="text-center py-8">
      <div className="w-12 h-12 rounded-full bg-surface-secondary flex items-center justify-center mx-auto mb-3">
        <SearchIcon className="w-6 h-6 text-text-disabled" />
      </div>
      <p className="text-[14px] font-medium text-text-primary mb-1">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="text-[12px] text-text-secondary max-w-xs mx-auto">
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
  itemCounter: initialCounter,
  onNavigate,
}: {
  results: InstantSearchResults;
  query: string;
  activeIndex: number;
  itemCounter: number;
  onNavigate: (url: string, searchQuery?: string) => void;
}) {
  let idx = initialCounter;

  return (
    <div className="py-2">
      {/* Products */}
      {results.products.length > 0 && (
        <div>
          <SectionHeader icon={<WrenchIcon />} label="Products" count={results.totalProducts} />
          {results.products.map((p) => {
            const currentIdx = idx++;
            const isActive = currentIdx === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => onNavigate(`/product/${p.slug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 py-2 transition-colors ${
                  isActive ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={isActive}
              >
                <ProductThumb src={p.imageUrl} alt={p.name} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary leading-tight truncate">
                    <Highlight segments={highlightMatch(p.name, query)} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {p.sku && (
                      <span className="text-[11px] font-mono text-text-disabled truncate max-w-[120px]">
                        <Highlight segments={highlightMatch(p.sku, query)} />
                      </span>
                    )}
                    {p.categoryName && (
                      <span className="text-[11px] text-text-disabled truncate max-w-[120px]">
                        {p.categoryName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-semibold font-numeric text-text-primary whitespace-nowrap">
                    {p.price}
                  </div>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        p.inStock ? "bg-status-success" : "bg-text-disabled"
                      }`}
                    />
                    <span className="text-[10px] text-text-disabled">
                      {p.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
          {results.totalProducts > 5 && (
            <button
              onClick={() => onNavigate(`/shop?search=${encodeURIComponent(query)}`, query)}
              className={`search-result-item flex items-center justify-between w-full px-3 py-2 transition-colors ${
                idx === activeIndex ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
              }`}
            >
              {(() => { idx++; return null; })()}
              <span className="text-[13px] font-medium text-interactive">
                View all {results.totalProducts} results
              </span>
              <ArrowRightIcon />
            </button>
          )}
          <Divider />
        </div>
      )}

      {/* Categories */}
      {results.categories.length > 0 && (
        <div>
          <SectionHeader icon={<FolderIcon />} label="Categories" />
          {results.categories.map((c) => {
            const currentIdx = idx++;
            const isActive = currentIdx === activeIndex;
            return (
              <button
                key={c.id}
                onClick={() => onNavigate(`/shop?categoryId=${c.id}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 py-2 transition-colors ${
                  isActive ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={isActive}
              >
                <div className="w-8 h-8 rounded-md bg-interactive-subtle flex items-center justify-center shrink-0">
                  <FolderIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">
                    <Highlight segments={highlightMatch(c.name, query)} />
                  </div>
                </div>
                <span className="text-[12px] text-text-disabled shrink-0">
                  {c.count} parts
                </span>
              </button>
            );
          })}
          <Divider />
        </div>
      )}

      {/* Engine Codes */}
      {results.engineCodes.length > 0 && (
        <div>
          <SectionHeader icon={<CpuIcon />} label="Engine Codes" />
          {results.engineCodes.map((e) => {
            const currentIdx = idx++;
            const isActive = currentIdx === activeIndex;
            return (
              <button
                key={e.code + e.modelSlug}
                onClick={() => onNavigate(`/vehicles/${e.makeSlug}/${e.modelSlug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 py-2 transition-colors ${
                  isActive ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={isActive}
              >
                <span className="badge-engine text-[12px] font-mono font-semibold px-2 py-0.5 shrink-0">
                  <Highlight segments={highlightMatch(e.code, query)} />
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-text-primary">
                    {e.displacement} {e.fuel}
                  </span>
                </div>
                <span className="text-[12px] text-text-disabled shrink-0">
                  {e.make} {e.model}
                </span>
              </button>
            );
          })}
          <Divider />
        </div>
      )}

      {/* Vehicles */}
      {results.vehicles.length > 0 && (
        <div>
          <SectionHeader icon={<CarIcon />} label="Vehicles" />
          {results.vehicles.map((v) => {
            const currentIdx = idx++;
            const isActive = currentIdx === activeIndex;
            return (
              <button
                key={v.makeSlug + v.modelSlug}
                onClick={() => onNavigate(`/vehicles/${v.makeSlug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 py-2 transition-colors ${
                  isActive ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={isActive}
              >
                <div className="w-8 h-8 rounded-md bg-surface-secondary flex items-center justify-center shrink-0 text-text-secondary">
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
      {results.partTypes.length > 0 && (
        <div>
          <SectionHeader icon={<WrenchIcon />} label="Part Types" />
          {results.partTypes.map((pt) => {
            const currentIdx = idx++;
            const isActive = currentIdx === activeIndex;
            return (
              <button
                key={pt.slug}
                onClick={() => onNavigate(`/shop?partType=${pt.slug}`)}
                className={`search-result-item flex items-center gap-3 w-full text-left px-3 py-2 transition-colors ${
                  isActive ? "bg-interactive-subtle" : "hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={isActive}
              >
                <div className="w-8 h-8 rounded-md bg-surface-secondary flex items-center justify-center shrink-0 text-text-secondary">
                  <WrenchIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">
                    <Highlight segments={highlightMatch(pt.name, query)} />
                  </div>
                </div>
                <ArrowRightIcon />
              </button>
            );
          })}
        </div>
      )}

      {/* Footer helper text */}
      <div className="px-3 py-2 border-t border-border/50 mt-1">
        <div className="flex items-center justify-between text-[11px] text-text-disabled">
          <span>
            <kbd className="px-1 py-0.5 font-mono bg-surface-secondary rounded border border-border/60 text-[10px]">↑↓</kbd>
            {" "}navigate{" "}
            <kbd className="px-1 py-0.5 font-mono bg-surface-secondary rounded border border-border/60 text-[10px]">↵</kbd>
            {" "}select{" "}
            <kbd className="px-1 py-0.5 font-mono bg-surface-secondary rounded border border-border/60 text-[10px]">esc</kbd>
            {" "}close
          </span>
          <span>{results.totalProducts} total matches</span>
        </div>
      </div>
    </div>
  );
}

// ─── Utility Sub-components ─────────────────────────────────────────────────

function SectionHeader({ icon, label, count }: { icon: React.ReactNode; label: string; count?: number }) {
  return (
    <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
      <span className="text-text-disabled">{icon}</span>
      <span className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">
        {label}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-[11px] text-text-disabled">({count})</span>
      )}
    </div>
  );
}

function Divider() {
  return <div className="mx-3 my-1 border-t border-border/40" />;
}
