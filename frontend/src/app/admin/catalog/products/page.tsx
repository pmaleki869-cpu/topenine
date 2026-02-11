"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProducts, getCategories, formatAED, classifyPartType } from "@/lib/products";

const PER_PAGE = 20;

export default function ProductsListPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "price" | "id">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.id.toString().includes(q)
      );
    }

    if (stockFilter === "in") result = result.filter((p) => p.is_in_stock);
    if (stockFilter === "out") result = result.filter((p) => !p.is_in_stock);

    if (categoryFilter) {
      result = result.filter((p) => p.categories.some((c) => c.slug === categoryFilter));
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "price") cmp = a.price_aed - b.price_aed;
      else cmp = a.id - b.id;
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [allProducts, search, stockFilter, categoryFilter, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageProducts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleSort(field: "name" | "price" | "id") {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortDir("asc"); }
    setPage(1);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Products</h1>
          <p className="text-[13px] text-gray-500">{filtered.length} of {allProducts.length} products</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 min-w-[200px] px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <select
            value={stockFilter}
            onChange={(e) => { setStockFilter(e.target.value as "all" | "in" | "out"); setPage(1); }}
            className="px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name} ({c.count})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide w-12">
                  <button onClick={() => toggleSort("id")} className="hover:text-gray-900">
                    ID {sortBy === "id" && (sortDir === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Image</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  <button onClick={() => toggleSort("name")} className="hover:text-gray-900">
                    Product {sortBy === "name" && (sortDir === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">SKU</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  <button onClick={() => toggleSort("price")} className="hover:text-gray-900">
                    Price {sortBy === "price" && (sortDir === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
              </tr>
            </thead>
            <tbody>
              {pageProducts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-gray-400 font-mono">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                      {p.primary_image_url ? (
                        <img src={p.primary_image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/catalog/products/${p.id}`} className="text-[13px] font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {p.name}
                    </Link>
                    <div className="text-[11px] text-gray-400 mt-0.5">{classifyPartType(p.name)}</div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-500 font-mono">{p.sku || "—"}</td>
                  <td className="px-4 py-3">
                    {p.categories.length > 0 ? (
                      <span className="text-[12px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{p.categories[0].name}</span>
                    ) : (
                      <span className="text-[12px] text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[13px] font-medium text-gray-900">
                    {p.price_aed > 0 ? formatAED(p.price_aed) : <span className="text-gray-400">—</span>}
                    {p.on_sale && p.sale_price_aed > 0 && (
                      <span className="ml-1 text-[11px] text-amber-600 font-medium">SALE</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${p.is_in_stock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                      {p.is_in_stock ? "In Stock" : "Out"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <div className="text-[12px] text-gray-500">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-[12px] font-medium rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                const n = start + i;
                if (n > totalPages) return null;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`px-3 py-1.5 text-[12px] font-medium rounded-md border ${n === page ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-[12px] font-medium rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
