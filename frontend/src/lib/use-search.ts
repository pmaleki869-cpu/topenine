"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  instantSearch,
  addRecentSearch,
  getRecentSearches,
  clearRecentSearches,
  POPULAR_SEARCHES,
  type InstantSearchResults,
} from "@/lib/search-engine";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface FlatItem {
  type: string;
  url: string;
  label: string;
}

export interface UseSearchReturn {
  // State
  query: string;
  isOpen: boolean;
  activeIndex: number;
  results: InstantSearchResults | null;
  recentSearches: string[];
  isLoading: boolean;

  // Refs
  inputRef: React.RefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;

  // Handlers
  handleInputChange: (value: string) => void;
  handleKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleRecentClick: (term: string) => void;
  handlePopularClick: (term: string) => void;
  handleClearRecent: () => void;
  navigateTo: (url: string, searchQuery?: string) => void;
  closeSearch: () => void;
  openSearch: () => void;

  // Computed
  flatItems: FlatItem[];
  hasResults: boolean;
  showEmptyState: boolean;
  showNoResults: boolean;
  showResults: boolean;
  queryType: "oem" | "engine" | "general";
}

// ─── Query-type auto-detection ──────────────────────────────────────────────

function detectQueryType(q: string): "oem" | "engine" | "general" {
  const trimmed = q.trim();
  if (!trimmed || trimmed.length < 2) return "general";

  // OEM number: starts with digits followed by dash/letter combos (e.g., 89661-F0B00, 11701-E0010)
  if (/^\d{4,}[\-]?[A-Za-z]/.test(trimmed)) return "oem";

  // Engine code: 2-4 alphanumeric chars optionally followed by dash + 2-4 letters (e.g., 1GD, 1GD-FTV, YD25, 4D56)
  if (/^[0-9]{1,2}[A-Za-z]{1,3}([\-]?[A-Za-z]{1,4})?$/.test(trimmed) && trimmed.length <= 8) return "engine";

  return "general";
}

// ─── Hook ───────────────────────────────────────────────────────────────────

interface UseSearchOptions {
  /** Enable Ctrl+K global shortcut */
  enableShortcut?: boolean;
  /** Enable click-outside detection */
  enableClickOutside?: boolean;
  /** Max results per section on desktop */
  maxProducts?: number;
  /** Callback when search closes */
  onClose?: () => void;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const {
    enableShortcut = false,
    enableClickOutside = true,
    maxProducts = 4,
    onClose,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState<InstantSearchResults | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
    setQuery("");
    setResults(null);
    setActiveIndex(-1);
    setIsLoading(false);
  }, [pathname]);

  // Click-outside handler
  useEffect(() => {
    if (!enableClickOutside) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [enableClickOutside]);

  // Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    if (!enableShortcut) return;
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
  }, [enableShortcut]);

  // Debounced search with loading state
  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(() => {
      const r = instantSearch(value);
      setResults(r);
      setIsLoading(false);
    }, 150);
  }, []);

  // Build flat list of navigable items
  const flatItems: FlatItem[] = (() => {
    if (!results) return [];
    const items: FlatItem[] = [];
    const prods = results.products.slice(0, maxProducts);
    for (const p of prods) {
      items.push({ type: "product", url: `/product/${p.slug}`, label: p.name });
    }
    if (results.totalProducts > maxProducts) {
      items.push({ type: "viewall", url: `/shop?search=${encodeURIComponent(results.query)}`, label: "View all results" });
    }
    for (const c of results.categories.slice(0, 2)) {
      items.push({ type: "category", url: `/shop?categoryId=${c.id}`, label: c.name });
    }
    for (const e of results.engineCodes.slice(0, 2)) {
      items.push({ type: "engine", url: `/vehicles/${e.makeSlug}/${e.modelSlug}`, label: e.code });
    }
    for (const v of results.vehicles.slice(0, 2)) {
      items.push({ type: "vehicle", url: `/vehicles/${v.makeSlug}`, label: `${v.makeName} ${v.modelName}` });
    }
    for (const pt of results.partTypes.slice(0, 2)) {
      items.push({ type: "parttype", url: `/shop?partType=${pt.slug}`, label: pt.name });
    }
    return items;
  })();

  // Navigate
  const navigateTo = useCallback(
    (url: string, searchQuery?: string) => {
      if (searchQuery) addRecentSearch(searchQuery);
      else if (query.trim()) addRecentSearch(query.trim());
      setIsOpen(false);
      setQuery("");
      setResults(null);
      setActiveIndex(-1);
      setIsLoading(false);
      router.push(url);
      if (onClose) onClose();
    },
    [query, router, onClose]
  );

  // Submit
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

  // Keyboard navigation — copies suggestion text to input on ↑↓
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev < flatItems.length - 1 ? prev + 1 : 0;
            // Copy suggestion label into the input (Baymard #6)
            if (flatItems[next] && flatItems[next].type !== "viewall") {
              setQuery(flatItems[next].label);
            }
            return next;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev > 0 ? prev - 1 : flatItems.length - 1;
            if (flatItems[next] && flatItems[next].type !== "viewall") {
              setQuery(flatItems[next].label);
            }
            return next;
          });
          break;
        case "Enter":
          if (activeIndex >= 0 && activeIndex < flatItems.length) {
            e.preventDefault();
            navigateTo(flatItems[activeIndex].url);
          }
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

  const handleRecentClick = useCallback((term: string) => {
    setQuery(term);
    setIsLoading(true);
    const r = instantSearch(term);
    setResults(r);
    setIsLoading(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handlePopularClick = useCallback((term: string) => {
    setQuery(term);
    setIsLoading(true);
    const r = instantSearch(term);
    setResults(r);
    setIsLoading(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleClearRecent = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
    setRecentSearches(getRecentSearches());
  }, []);

  // Computed
  const hasResults = !!(results && (
    results.products.length > 0 ||
    results.categories.length > 0 ||
    results.engineCodes.length > 0 ||
    results.vehicles.length > 0 ||
    results.partTypes.length > 0
  ));

  const showEmptyState = isOpen && !results && !isLoading && query.length < 2;
  const showNoResults = isOpen && !!results && !hasResults && !isLoading;
  const showResults = isOpen && !!results && hasResults;

  return {
    query,
    isOpen,
    activeIndex,
    results,
    recentSearches,
    isLoading,
    inputRef,
    containerRef,
    handleInputChange,
    handleKeyDown,
    handleFocus,
    handleSubmit,
    handleRecentClick,
    handlePopularClick,
    handleClearRecent,
    navigateTo,
    closeSearch,
    openSearch,
    flatItems,
    hasResults,
    showEmptyState,
    showNoResults,
    showResults,
    queryType: detectQueryType(query),
  };
}

export { POPULAR_SEARCHES };
