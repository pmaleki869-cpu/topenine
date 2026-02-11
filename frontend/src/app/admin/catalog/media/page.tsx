"use client";

import { useState, useMemo, useTransition } from "react";
import { getAllProducts } from "@/lib/products";
import { updateProductImage } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Search, X, ImageIcon, Save, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

const PER_PAGE = 48;

export default function MediaLibraryPage() {
  const products = useMemo(() => getAllProducts(), []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "has" | "missing">("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    let result = [...products];
    if (filter === "has") result = result.filter((p) => p.primary_image_url);
    if (filter === "missing") result = result.filter((p) => !p.primary_image_url);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.id.toString().includes(q)
      );
    }
    return result;
  }, [products, search, filter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const withImages = products.filter((p) => p.primary_image_url).length;
  const withoutImages = products.length - withImages;

  const selectedProduct = selectedId ? products.find((p) => p.id === selectedId) : null;

  function openDetail(id: number) {
    const p = products.find((pr) => pr.id === id);
    setSelectedId(id);
    setEditUrl(p?.primary_image_url || "");
  }

  function handleSaveImage() {
    if (!selectedId) return;
    startTransition(async () => {
      const result = await updateProductImage(selectedId, editUrl.trim());
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Media Library</h1>
          <p className="text-[13px] text-gray-500">
            {withImages} images · {withoutImages} products missing images
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => { setFilter("all"); setPage(1); }} className={`bg-white rounded-xl border p-4 text-center transition-colors ${filter === "all" ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="text-[28px] font-bold text-gray-900">{products.length}</div>
          <div className="text-[12px] text-gray-500">Total Products</div>
        </button>
        <button onClick={() => { setFilter("has"); setPage(1); }} className={`bg-white rounded-xl border p-4 text-center transition-colors ${filter === "has" ? "border-emerald-300 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="text-[28px] font-bold text-emerald-600">{withImages}</div>
          <div className="text-[12px] text-gray-500">With Images</div>
        </button>
        <button onClick={() => { setFilter("missing"); setPage(1); }} className={`bg-white rounded-xl border p-4 text-center transition-colors ${filter === "missing" ? "border-amber-300 ring-2 ring-amber-100" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="text-[28px] font-bold text-amber-600">{withoutImages}</div>
          <div className="text-[12px] text-gray-500">Missing</div>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            aria-label="Search media"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Image grid */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-gray-900">
                {filter === "missing" ? "Products Missing Images" : filter === "has" ? "Products With Images" : "All Products"} ({filtered.length})
              </h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {pageItems.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openDetail(p.id)}
                  className={`group relative text-left ${selectedId === p.id ? "ring-2 ring-blue-500 rounded-lg" : ""}`}
                >
                  <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                    {p.primary_image_url ? (
                      <img src={p.primary_image_url} alt={p.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-2">
                    <span className="text-[10px] text-white font-medium line-clamp-2 leading-tight">{p.sku || `#${p.id}`}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-[12px] text-gray-500">Page {page} of {totalPages}</span>
                <div className="flex gap-1">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-[12px] font-medium rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40">Prev</button>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-[12px] font-medium rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selectedProduct && (
          <div className="w-80 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-gray-900">Image Details</h3>
                <button onClick={() => setSelectedId(null)} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Preview */}
              <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                {selectedProduct.primary_image_url ? (
                  <img src={selectedProduct.primary_image_url} alt={selectedProduct.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-medium text-gray-500 uppercase">Product</span>
                  <Link href={`/admin/catalog/products/${selectedProduct.id}`} className="block text-[13px] font-medium text-blue-600 hover:text-blue-700 line-clamp-2">
                    {selectedProduct.name}
                  </Link>
                </div>
                <div className="flex gap-4 text-[12px]">
                  <div>
                    <span className="text-gray-500">ID:</span>{" "}
                    <span className="font-mono text-gray-700">{selectedProduct.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SKU:</span>{" "}
                    <span className="font-mono text-gray-700">{selectedProduct.sku || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Edit image URL */}
              <div>
                <label htmlFor="imgUrl" className="block text-[11px] font-medium text-gray-500 uppercase mb-1">
                  Image URL
                </label>
                <input
                  id="imgUrl"
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-[12px] font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveImage}
                  disabled={isPending}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-[12px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save
                </button>
                {editUrl && (
                  <a
                    href={editUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-2 text-[12px] font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Gallery images */}
              {selectedProduct.images.length > 1 && (
                <div>
                  <span className="text-[11px] font-medium text-gray-500 uppercase">Gallery ({selectedProduct.images.length})</span>
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {selectedProduct.images.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => setEditUrl(img.src)}
                        className="aspect-square rounded bg-gray-100 overflow-hidden border border-gray-200 hover:border-blue-400"
                      >
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
