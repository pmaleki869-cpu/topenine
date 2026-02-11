"use client";

import { useCallback } from "react";
import { PART_TYPES } from "@/data/vehicle-hierarchy";

interface FilterSidebarProps {
  partType: string;
  purchasableOnly: boolean;
  inStockOnly: boolean;
  search: string;
  sort: string;
  onPartTypeChange: (v: string) => void;
  onPurchasableChange: (v: boolean) => void;
  onInStockChange: (v: boolean) => void;
  onSearchChange: (v: string) => void;
  onSortChange: (v: string) => void;
  onClearAll: () => void;
  total: number;
  partTypeCounts?: Record<string, number>;
}

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest first" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
];

/**
 * FilterSidebar — v5.0 Spec
 * Filter counts next to part types. Cleaner spacing.
 */
export function FilterSidebar({
  partType,
  purchasableOnly,
  inStockOnly,
  search,
  sort,
  onPartTypeChange,
  onPurchasableChange,
  onInStockChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  total,
  partTypeCounts,
}: FilterSidebarProps) {
  const activePartTypes = PART_TYPES.filter((pt) => pt.slug !== "other");
  const hasFilters = partType || purchasableOnly || inStockOnly || search;

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
    },
    []
  );

  return (
    <aside className="space-y-5">
      {/* Result count + Clear */}
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-text-secondary">
          <strong className="text-text-primary font-semibold">{total}</strong> parts
        </p>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-[12px] text-status-danger hover:underline font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search within results */}
      <div>
        <label className="block text-[12px] font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
          Search
        </label>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="OEM number, engine code…"
            className="w-full px-3 py-2 text-[14px] border border-border rounded-md bg-white text-text-primary 
                       placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-interactive/40"
          />
        </form>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-[12px] font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
          Sort by
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 text-[14px] border border-border rounded-md bg-white text-text-primary
                     focus:outline-none focus:ring-2 focus:ring-interactive/40"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Part Type */}
      <div>
        <label className="block text-[12px] font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
          Part type
        </label>
        <div className="space-y-0.5 max-h-64 overflow-y-auto" role="radiogroup" aria-label="Filter by part type">
          <button
            onClick={() => onPartTypeChange("")}
            role="radio"
            aria-checked={!partType}
            className={`flex items-center justify-between w-full text-left text-[14px] px-3 py-1.5 rounded-md transition-colors ${
              !partType
                ? "bg-interactive-subtle text-interactive font-semibold"
                : "text-text-primary hover:bg-surface-secondary"
            }`}
          >
            <span>All types</span>
          </button>
          {activePartTypes.map((pt) => (
            <button
              key={pt.slug}
              onClick={() => onPartTypeChange(pt.slug)}
              role="radio"
              aria-checked={partType === pt.slug}
              className={`flex items-center justify-between w-full text-left text-[14px] px-3 py-1.5 rounded-md transition-colors ${
                partType === pt.slug
                  ? "bg-interactive-subtle text-interactive font-semibold"
                  : "text-text-primary hover:bg-surface-secondary"
              }`}
            >
              <span>{pt.name}</span>
              {partTypeCounts && partTypeCounts[pt.slug] !== undefined && (
                <span className="text-[12px] text-text-disabled">{partTypeCounts[pt.slug]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2.5">
        <label className="block text-[12px] font-semibold text-text-secondary uppercase tracking-wide">
          Availability
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={purchasableOnly}
            onChange={(e) => onPurchasableChange(e.target.checked)}
            className="rounded border-border text-interactive focus:ring-interactive/40"
          />
          <span className="text-[14px] text-text-primary">With price only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="rounded border-border text-interactive focus:ring-interactive/40"
          />
          <span className="text-[14px] text-text-primary">In stock only</span>
        </label>
      </div>
    </aside>
  );
}
