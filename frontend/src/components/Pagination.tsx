"use client";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination — v5.0 Design System
 * Prev/next + page numbers with 44px min touch targets.
 */
export function Pagination({ page, pages, onPageChange }: PaginationProps) {
  if (pages <= 1) return null;

  const range: (number | "...")[] = [];

  // Always show first page
  range.push(1);

  if (page > 3) range.push("...");

  for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) {
    range.push(i);
  }

  if (page < pages - 2) range.push("...");

  if (pages > 1) range.push(pages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="min-h-11 px-4 text-[14px] rounded-lg bg-surface-elevated text-text-primary shadow-sm
                   hover:bg-interactive-subtle transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>

      {range.map((item, i) =>
        item === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-secondary text-[14px]">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`min-h-11 w-11 text-[14px] rounded-lg transition-colors ${
              item === page
                ? "bg-interactive text-text-inverse font-semibold shadow-sm"
                : "bg-surface-elevated text-text-primary shadow-sm hover:bg-interactive-subtle"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="min-h-11 px-4 text-[14px] rounded-lg bg-surface-elevated text-text-primary shadow-sm
                   hover:bg-interactive-subtle transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </nav>
  );
}
