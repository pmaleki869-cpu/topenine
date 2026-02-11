"use client";

import { useState, useMemo, useTransition } from "react";
import { getAllProducts, formatAED } from "@/lib/products";
import { toggleStock } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function InventoryPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (filter === "in") result = result.filter((p) => p.is_in_stock);
    if (filter === "out") result = result.filter((p) => !p.is_in_stock);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    return result;
  }, [allProducts, filter, search]);

  const inStock = allProducts.filter((p) => p.is_in_stock).length;
  const outOfStock = allProducts.length - inStock;

  function handleToggle(productId: number, currentStatus: boolean) {
    setTogglingId(productId);
    startTransition(async () => {
      const result = await toggleStock(productId, !currentStatus);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
      setTogglingId(null);
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[20px] font-bold text-gray-900">Inventory</h1>
        <p className="text-[13px] text-gray-500">Stock overview — {allProducts.length} products</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => setFilter("all")} className={`bg-white rounded-xl border p-4 text-center transition-colors ${filter === "all" ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="text-[28px] font-bold text-gray-900">{allProducts.length}</div>
          <div className="text-[12px] text-gray-500">Total</div>
        </button>
        <button onClick={() => setFilter("in")} className={`bg-white rounded-xl border p-4 text-center transition-colors ${filter === "in" ? "border-emerald-300 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="text-[28px] font-bold text-emerald-600">{inStock}</div>
          <div className="text-[12px] text-gray-500">In Stock</div>
        </button>
        <button onClick={() => setFilter("out")} className={`bg-white rounded-xl border p-4 text-center transition-colors ${filter === "out" ? "border-red-300 ring-2 ring-red-100" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="text-[28px] font-bold text-red-600">{outOfStock}</div>
          <div className="text-[12px] text-gray-500">Out of Stock</div>
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <div>
          <p className="text-[13px] font-medium text-blue-800">Quick stock toggle</p>
          <p className="text-[12px] text-blue-700 mt-1">Click the toggle switch in each row to instantly flip a product&apos;s stock status between In Stock and Out of Stock.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          aria-label="Search inventory"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide w-16">ID</th>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">SKU</th>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th scope="col" className="text-center px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th scope="col" className="text-center px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Purchasable</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 100).map((p) => (
                <tr key={p.id} className={`border-b border-gray-50 transition-colors ${!p.is_in_stock ? "bg-red-50/30" : "hover:bg-gray-50/50"}`}>
                  <td className="px-4 py-2.5 text-[12px] text-gray-400 font-mono">{p.id}</td>
                  <td className="px-4 py-2.5 text-[13px] text-gray-900 line-clamp-1">{p.name}</td>
                  <td className="px-4 py-2.5 text-[12px] text-gray-500 font-mono">{p.sku || "—"}</td>
                  <td className="px-4 py-2.5 text-[13px] text-gray-900 font-medium">{p.price_aed > 0 ? formatAED(p.price_aed) : "—"}</td>
                  <td className="px-4 py-2.5 text-center">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={p.is_in_stock}
                      aria-label={`Toggle stock for ${p.name}`}
                      onClick={() => handleToggle(p.id, p.is_in_stock)}
                      disabled={isPending && togglingId === p.id}
                      className={`relative inline-flex w-10 h-[22px] rounded-full transition-colors ${p.is_in_stock ? "bg-emerald-500" : "bg-red-400"} disabled:opacity-50`}
                    >
                      {isPending && togglingId === p.id ? (
                        <Loader2 className="w-3.5 h-3.5 text-white animate-spin absolute top-[3px] left-[3px]" />
                      ) : (
                        <span className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${p.is_in_stock ? "translate-x-[18px]" : ""}`} />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {p.is_purchasable ? (
                      <svg className="w-4 h-4 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 100 && (
          <div className="px-4 py-3 border-t border-gray-100 text-[12px] text-gray-400 text-center">
            Showing 100 of {filtered.length} products
          </div>
        )}
      </div>
    </div>
  );
}
