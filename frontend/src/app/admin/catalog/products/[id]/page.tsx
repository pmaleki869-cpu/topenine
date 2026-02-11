import { getAllProducts, getCategories, formatAED } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id.toString() }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = getAllProducts();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) notFound();

  const categories = getCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/catalog/products" className="text-[12px] text-gray-500 hover:text-blue-600">← Products</Link>
          </div>
          <h1 className="text-[18px] font-bold text-gray-900 line-clamp-2">{product.name}</h1>
          <p className="text-[12px] text-gray-400 font-mono">ID: {product.id} · SKU: {product.sku || "N/A"}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/product/${product.slug}`}
            target="_blank"
            className="px-3 py-2 text-[12px] font-medium rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            View on store ↗
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Core Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Core Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-500 mb-1">Product Name</label>
                <input type="text" defaultValue={product.name} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-500 mb-1">SKU</label>
                  <input type="text" defaultValue={product.sku} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 font-mono" readOnly />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-500 mb-1">Slug</label>
                  <input type="text" defaultValue={product.slug} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 font-mono text-gray-500" readOnly />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-500 mb-1">Short Description</label>
                <textarea defaultValue={product.short_description} rows={3} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 resize-none" readOnly />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-500 mb-1">Full Description</label>
                <textarea defaultValue={product.description_raw} rows={5} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 resize-none" readOnly />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Pricing</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-500 mb-1">Regular Price (AED)</label>
                <input type="text" defaultValue={product.regular_price_aed || ""} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 font-mono" readOnly />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-500 mb-1">Sale Price (AED)</label>
                <input type="text" defaultValue={product.sale_price_aed || ""} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-gray-50 font-mono" readOnly />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-500 mb-1">Current Price (AED)</label>
                <div className="px-3 py-2 text-[15px] font-bold text-gray-900 border border-gray-200 rounded-lg bg-gray-50">
                  {product.price_aed > 0 ? formatAED(product.price_aed) : "—"}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-3">
              <label className="flex items-center gap-2 text-[13px] text-gray-700">
                <input type="checkbox" checked={product.on_sale} readOnly className="rounded border-gray-300" />
                On Sale
              </label>
              <label className="flex items-center gap-2 text-[13px] text-gray-700">
                <input type="checkbox" checked={product.is_purchasable} readOnly className="rounded border-gray-300" />
                Purchasable
              </label>
            </div>
          </div>

          {/* Attributes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Attributes</h2>
            {product.attributes.length > 0 ? (
              <div className="space-y-3">
                {product.attributes.map((attr) => (
                  <div key={attr.id}>
                    <div className="text-[12px] font-medium text-gray-500 mb-1">{attr.name}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {attr.terms.map((t) => (
                        <span key={t.id} className="px-2.5 py-1 text-[12px] bg-blue-50 text-blue-700 rounded-md font-medium">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-400">No attributes defined.</p>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Tags ({product.tags.length})</h2>
            {product.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((t) => (
                  <span key={t.id} className="px-2.5 py-1 text-[12px] bg-gray-100 text-gray-700 rounded-md">{t.name}</span>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-400">No tags.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[13px] text-gray-500">Stock</span>
                <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${product.is_in_stock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {product.is_in_stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-gray-500">Type</span>
                <span className="text-[13px] font-medium text-gray-900 capitalize">{product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-gray-500">Purchasable</span>
                <span className="text-[13px] font-medium text-gray-900">{product.is_purchasable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-gray-500">Variations</span>
                <span className="text-[13px] font-medium text-gray-900">{product.variations.length}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Primary Image</h2>
            <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
              {product.primary_image_url ? (
                <img src={product.primary_image_url} alt={product.name} className="w-full h-full object-contain" />
              ) : (
                <div className="text-center">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-[12px] text-gray-400">No image</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {product.images.slice(0, 4).map((img) => (
                  <div key={img.id} className="aspect-square rounded bg-gray-100 overflow-hidden">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Categories</h2>
            {product.categories.length > 0 ? (
              <div className="space-y-1.5">
                {product.categories.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 text-[13px] text-gray-700">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    {c.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-400">Uncategorized</p>
            )}
          </div>

          {/* Brands */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Brands</h2>
            {product.brands.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {product.brands.map((b) => (
                  <span key={b} className="px-2.5 py-1 text-[12px] bg-violet-50 text-violet-700 rounded-md font-medium capitalize">{b}</span>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-400">No brands.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
