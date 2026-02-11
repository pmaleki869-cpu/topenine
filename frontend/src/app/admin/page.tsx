import { getAllProducts, getCategories } from "@/lib/products";
import Link from "next/link";

export default function AdminDashboard() {
  const products = getAllProducts();
  const categories = getCategories();

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.is_in_stock).length;
  const outOfStock = totalProducts - inStock;
  const onSale = products.filter((p) => p.on_sale).length;
  const withImages = products.filter((p) => p.primary_image_url).length;
  const avgPrice = Math.round(
    products.filter((p) => p.price_aed > 0).reduce((s, p) => s + p.price_aed, 0) /
      (products.filter((p) => p.price_aed > 0).length || 1)
  );

  const kpis = [
    { label: "Total Products", value: totalProducts, color: "bg-blue-500" },
    { label: "In Stock", value: inStock, color: "bg-emerald-500" },
    { label: "Out of Stock", value: outOfStock, color: "bg-red-500" },
    { label: "On Sale", value: onSale, color: "bg-amber-500" },
    { label: "Categories", value: categories.length, color: "bg-violet-500" },
    { label: "With Images", value: withImages, color: "bg-cyan-500" },
  ];

  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 8);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${kpi.color}`} />
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{kpi.label}</span>
            </div>
            <div className="text-[28px] font-bold text-gray-900 leading-none">{kpi.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/catalog/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
              Manage Products
            </Link>
            <Link href="/admin/catalog/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              Manage Categories
            </Link>
            <Link href="/admin/inventory" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              View Inventory
            </Link>
            <Link href="/admin/catalog/media" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Media Library
            </Link>
          </div>
        </div>

        {/* Catalog Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Catalog Stats</h2>
          <dl className="space-y-3">
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Average Price</dt>
              <dd className="text-[13px] font-semibold text-gray-900">AED {avgPrice.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Image Coverage</dt>
              <dd className="text-[13px] font-semibold text-gray-900">{Math.round((withImages / totalProducts) * 100)}%</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Stock Rate</dt>
              <dd className="text-[13px] font-semibold text-gray-900">{Math.round((inStock / totalProducts) * 100)}%</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Purchasable</dt>
              <dd className="text-[13px] font-semibold text-gray-900">{products.filter((p) => p.is_purchasable).length}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Variable Products</dt>
              <dd className="text-[13px] font-semibold text-gray-900">{products.filter((p) => p.type === "variable").length}</dd>
            </div>
          </dl>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.slice(0, 8).map((cat) => (
              <div key={cat.id} className="flex justify-between items-center">
                <span className="text-[13px] text-gray-700 truncate">{cat.name}</span>
                <span className="text-[12px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
              </div>
            ))}
            {categories.length > 8 && (
              <Link href="/admin/catalog/categories" className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
                View all {categories.length} categories →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-[14px] font-semibold text-gray-900">Recently Added Products</h2>
          <Link href="/admin/catalog/products" className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">SKU</th>
                <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/catalog/products/${p.id}`} className="text-[13px] font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[12px] text-gray-500 font-mono">{p.sku || "—"}</td>
                  <td className="px-5 py-3 text-[13px] font-medium text-gray-900">
                    {p.price_aed > 0 ? `AED ${p.price_aed.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${p.is_in_stock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                      {p.is_in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
