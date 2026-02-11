"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const PLACEHOLDERS = [
  "Search: 89661-F0B00",
  "Search: 1GD turbocharger",
  "Search: Hilux crankshaft",
  "Search: YD25 injector",
  "Search: WL alternator",
];

/**
 * HeroSearch — large, auto-focused search input with rotating placeholder text.
 * Used exclusively in the homepage hero. 52px height, full-width up to max-w-xl.
 */
export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
      }
    },
    [query, router]
  );

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="flex rounded-xl overflow-hidden shadow-lg shadow-black/20 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-interactive/60 transition-all duration-200">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={PLACEHOLDERS[placeholderIdx]}
            className={`w-full h-[52px] px-5 bg-white text-text-primary text-[16px] border-0 outline-none transition-opacity duration-200 placeholder:text-text-disabled/70 ${
              fade ? "placeholder:opacity-100" : "placeholder:opacity-0"
            }`}
            aria-label="Search for engine parts by name, OEM number, or engine code"
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
  );
}
