"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * SearchBar — v5.1 Design System
 * OEM-normalized search with aria-label.
 */
export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

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
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by part name, OEM number, or engine code…"
          aria-label="Search for engine parts"
          className="w-full px-3 py-2 rounded-l-md bg-white text-text-primary text-[14px] border-0 outline-none placeholder:text-text-disabled"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-interactive hover:bg-interactive-hover text-text-inverse rounded-r-md transition-colors shrink-0"
          aria-label="Search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
