import { getCategories, getAllProducts } from "@/lib/products";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = getCategories();
  const allProducts = getAllProducts();

  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    productCount: allProducts.filter((p) => p.categories.some((c) => c.id === cat.id)).length,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Categories</h1>
          <p className="text-[13px] text-gray-500">{categories.length} categories</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide w-12">ID</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Slug</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Description</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Products</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">WC Count</th>
            </tr>
          </thead>
          <tbody>
            {categoriesWithCounts.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                <td className="px-5 py-3 text-[12px] text-gray-400 font-mono">{cat.id}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {cat.image ? (
                      <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0">
                        <img src={cat.image.src} alt={cat.image.alt} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                      </div>
                    )}
                    <span className="text-[13px] font-medium text-gray-900">{cat.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[12px] text-gray-500 font-mono">{cat.slug}</td>
                <td className="px-5 py-3 text-[12px] text-gray-500 max-w-[200px] truncate">{cat.description || "—"}</td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/catalog/products?category=${cat.slug}`} className="text-[13px] font-semibold text-blue-600 hover:text-blue-700">
                    {cat.productCount}
                  </Link>
                </td>
                <td className="px-5 py-3 text-right text-[12px] text-gray-400">{cat.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
