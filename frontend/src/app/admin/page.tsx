import { getAllProducts, getCategories } from "@/lib/products";
import Link from "next/link";
import {
  Package,
  FolderOpen,
  Warehouse,
  ImageIcon,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Tag,
  Layers,
  Camera,
} from "lucide-react";
import { StockDonut, CategoryBarChart, PriceDistribution } from "./DashboardCharts";

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
    { label: "Total Products", value: totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "In Stock", value: inStock, icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Out of Stock", value: outOfStock, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
    { label: "On Sale", value: onSale, icon: Tag, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Categories", value: categories.length, icon: Layers, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "With Images", value: withImages, icon: Camera, color: "text-cyan-600", bg: "bg-cyan-50" },
  ];

  // Chart data
  const stockData = [
    { name: "In Stock", value: inStock },
    { name: "Out of Stock", value: outOfStock },
  ];

  const categoryData = categories
    .map((c) => ({
      name: c.name.replace(/^OEM\s+/i, "").replace(/\s+Parts?$/i, ""),
      count: c.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const priceRanges = [
    { range: "0-50", min: 0, max: 50 },
    { range: "50-200", min: 50, max: 200 },
    { range: "200-500", min: 200, max: 500 },
    { range: "500-1K", min: 500, max: 1000 },
    { range: "1K-5K", min: 1000, max: 5000 },
    { range: "5K+", min: 5000, max: Infinity },
  ];
  const priceData = priceRanges.map((r) => ({
    range: r.range,
    count: products.filter((p) => p.price_aed >= r.min && p.price_aed < r.max).length,
  }));

  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200/80 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} strokeWidth={1.75} />
                </div>
              </div>
              <div className="text-[26px] font-bold text-gray-900 leading-none tracking-tight">{kpi.value.toLocaleString()}</div>
              <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mt-1">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StockDonut data={stockData} />
        <CategoryBarChart data={categoryData} />
        <PriceDistribution data={priceData} />
      </div>

      {/* Quick Actions + Catalog Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/admin/catalog/products" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <Package className="w-4 h-4" strokeWidth={1.5} />
              Products
            </Link>
            <Link href="/admin/catalog/categories" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <FolderOpen className="w-4 h-4" strokeWidth={1.5} />
              Categories
            </Link>
            <Link href="/admin/inventory" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <Warehouse className="w-4 h-4" strokeWidth={1.5} />
              Inventory
            </Link>
            <Link href="/admin/catalog/media" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 hover:bg-blue-50 text-[13px] font-medium text-gray-700 hover:text-blue-700 transition-colors">
              <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
              Media Library
            </Link>
          </div>
        </div>

        {/* Catalog Stats */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            <h2 className="text-[14px] font-semibold text-gray-900">Catalog Insights</h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Avg Price</dt>
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
              <dt className="text-[13px] text-gray-500">Variable</dt>
              <dd className="text-[13px] font-semibold text-gray-900">{products.filter((p) => p.type === "variable").length}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-[13px] text-gray-500">Sale Rate</dt>
              <dd className="text-[13px] font-semibold text-gray-900">{Math.round((onSale / totalProducts) * 100)}%</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl border border-gray-200/80">
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
                <th scope="col" className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                <th scope="col" className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">SKU</th>
                <th scope="col" className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th scope="col" className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
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
