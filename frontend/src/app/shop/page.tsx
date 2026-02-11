"use client";

import { useState, useMemo, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Pagination } from "@/components/Pagination";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getFilteredProducts, getCategories } from "@/lib/products";

const PER_PAGE = 24;

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [partType, setPartType] = useState(searchParams.get("partType") || "");
  const [purchasableOnly, setPurchasableOnly] = useState(searchParams.get("purchasableOnly") === "true");
  const [inStockOnly, setInStockOnly] = useState(searchParams.get("inStockOnly") === "true");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "relevance");
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") || "");
  const [categoryId, setCategoryId] = useState(Number(searchParams.get("categoryId")) || 0);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categories = useMemo(() => getCategories(), []);

  const syncUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams();
      const state = {
        partType,
        purchasableOnly: purchasableOnly ? "true" : "",
        inStockOnly: inStockOnly ? "true" : "",
        search,
        sort,
        priceMin,
        priceMax,
        categoryId: categoryId ? String(categoryId) : "",
        page: String(page),
        ...updates,
      };
      Object.entries(state).forEach(([k, v]) => {
        if (v && v !== "1" && v !== "relevance") params.set(k, v);
        else if (k === "page" && v !== "1") params.set(k, v);
      });
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    },
    [partType, purchasableOnly, inStockOnly, search, sort, priceMin, priceMax, categoryId, page, router]
  );

  const { products, total, pages } = useMemo(
    () =>
      getFilteredProducts({
        partType,
        purchasableOnly,
        inStockOnly,
        search,
        sort: sort as "relevance" | "newest" | "name-asc" | "name-desc" | "price-asc" | "price-desc",
        priceMin: priceMin ? Number(priceMin) : undefined,
        priceMax: priceMax ? Number(priceMax) : undefined,
        categoryId: categoryId || undefined,
        page,
        perPage: PER_PAGE,
      }),
    [partType, purchasableOnly, inStockOnly, search, sort, priceMin, priceMax, categoryId, page]
  );

  const hasFilters = partType || purchasableOnly || inStockOnly || search || priceMin || priceMax || categoryId;

  const handleClearAll = () => {
    setPartType("");
    setPurchasableOnly(false);
    setInStockOnly(false);
    setSearch("");
    setSort("relevance");
    setPriceMin("");
    setPriceMax("");
    setCategoryId(0);
    setPage(1);
    router.replace("/shop", { scroll: false });
  };

  const handlePartTypeChange = (v: string) => { setPartType(v); setPage(1); syncUrl({ partType: v, page: "1" }); };
  const handlePurchasableChange = (v: boolean) => { setPurchasableOnly(v); setPage(1); syncUrl({ purchasableOnly: v ? "true" : "", page: "1" }); };
  const handleInStockChange = (v: boolean) => { setInStockOnly(v); setPage(1); syncUrl({ inStockOnly: v ? "true" : "", page: "1" }); };
  const handleSearchChange = (v: string) => {
    setSearch(v);
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setPage(1);
      syncUrl({ search: v, page: "1" });
    }, 300);
  };
  const handleSortChange = (v: string) => { setSort(v); setPage(1); syncUrl({ sort: v, page: "1" }); };
  const handlePriceMinChange = (v: string) => { setPriceMin(v); setPage(1); syncUrl({ priceMin: v, page: "1" }); };
  const handlePriceMaxChange = (v: string) => { setPriceMax(v); setPage(1); syncUrl({ priceMax: v, page: "1" }); };
  const handleCategoryIdChange = (v: number) => { setCategoryId(v); setPage(1); syncUrl({ categoryId: v ? String(v) : "", page: "1" }); };
  const handlePageChange = (p: number) => { setPage(p); syncUrl({ page: String(p) }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "All parts" }]} />

      {/* Page header */}
      <div className="container-main py-5">
          <h1 className="text-[28px] font-semibold text-text-primary mb-0.5">
            {search ? `Search: "${search}"` : "All engine parts"}
          </h1>
          <p className="text-text-secondary text-[14px]">
            {total} parts found
            {partType && ` in ${partType.replace(/-/g, " ")}`}
          </p>
      </div>

      <div className="container-main py-6 lg:py-8">
        <div className="flex gap-6">
          {/* Filter sidebar — desktop */}
          <div className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 bg-surface-elevated rounded-md p-4 border border-border">
              <FilterSidebar
                partType={partType}
                purchasableOnly={purchasableOnly}
                inStockOnly={inStockOnly}
                search={search}
                sort={sort}
                priceMin={priceMin}
                priceMax={priceMax}
                categoryId={categoryId}
                categories={categories}
                onPartTypeChange={handlePartTypeChange}
                onPurchasableChange={handlePurchasableChange}
                onInStockChange={handleInStockChange}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                onPriceMinChange={handlePriceMinChange}
                onPriceMaxChange={handlePriceMaxChange}
                onCategoryIdChange={handleCategoryIdChange}
                onClearAll={handleClearAll}
                total={total}
              />
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter bar */}
            <div className="lg:hidden mb-4 flex gap-2">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="btn btn-secondary btn-sm flex-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters {hasFilters && `(active)`}
              </button>
              {hasFilters && (
                <button onClick={handleClearAll} className="btn btn-sm text-status-danger border border-status-danger bg-transparent">
                  Clear
                </button>
              )}
            </div>

            {mobileFiltersOpen && (
              <div className="lg:hidden mb-5 bg-surface-elevated rounded-md p-4 border border-border">
                <FilterSidebar
                  partType={partType}
                  purchasableOnly={purchasableOnly}
                  inStockOnly={inStockOnly}
                  search={search}
                  sort={sort}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  categoryId={categoryId}
                  categories={categories}
                  onPartTypeChange={handlePartTypeChange}
                  onPurchasableChange={handlePurchasableChange}
                  onInStockChange={handleInStockChange}
                  onSearchChange={handleSearchChange}
                  onSortChange={handleSortChange}
                  onPriceMinChange={handlePriceMinChange}
                  onPriceMaxChange={handlePriceMaxChange}
                  onCategoryIdChange={handleCategoryIdChange}
                  onClearAll={handleClearAll}
                  total={total}
                />
              </div>
            )}

            {products.length === 0 ? (
              <div className="text-center py-16 card">
                <svg className="w-10 h-10 mx-auto mb-3 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-text-primary font-semibold mb-1 text-[16px]">No parts match your filters</p>
                <p className="text-text-secondary text-[14px] mb-5 max-w-sm mx-auto">
                  Try broadening your search or browse by vehicle make.
                </p>
                <button onClick={handleClearAll} className="btn btn-primary btn-sm mb-4">
                  Clear all filters
                </button>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { href: "/vehicles/toyota", label: "Toyota" },
                    { href: "/vehicles/nissan", label: "Nissan" },
                    { href: "/vehicles/ford", label: "Ford" },
                    { href: "/vehicles/mitsubishi", label: "Mitsubishi" },
                  ].map((v) => (
                    <Link key={v.href} href={v.href} className="text-[13px] text-interactive hover:underline font-medium">
                      {v.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary">Loading parts…</div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
