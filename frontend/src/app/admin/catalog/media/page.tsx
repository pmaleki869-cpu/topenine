import { getAllProducts } from "@/lib/products";

export default function MediaLibraryPage() {
  const products = getAllProducts();
  const productsWithImages = products.filter((p) => p.primary_image_url);
  const productsWithoutImages = products.filter((p) => !p.primary_image_url);

  // Collect all unique images
  const allImages = productsWithImages.map((p) => ({
    productId: p.id,
    productName: p.name,
    src: p.primary_image_url,
    sku: p.sku,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Media Library</h1>
          <p className="text-[13px] text-gray-500">
            {allImages.length} images · {productsWithoutImages.length} products missing images
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-[28px] font-bold text-gray-900">{allImages.length}</div>
          <div className="text-[12px] text-gray-500">Total Images</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-[28px] font-bold text-emerald-600">{Math.round((allImages.length / products.length) * 100)}%</div>
          <div className="text-[12px] text-gray-500">Coverage</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-[28px] font-bold text-amber-600">{productsWithoutImages.length}</div>
          <div className="text-[12px] text-gray-500">Missing</div>
        </div>
      </div>

      {/* Image grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Product Images</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {allImages.slice(0, 48).map((img) => (
            <div key={img.productId} className="group relative">
              <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                <img src={img.src} alt={img.productName} className="w-full h-full object-contain" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-2">
                <span className="text-[10px] text-white font-medium line-clamp-2 leading-tight">{img.sku || img.productName}</span>
              </div>
            </div>
          ))}
        </div>
        {allImages.length > 48 && (
          <p className="text-[12px] text-gray-400 text-center mt-4">Showing 48 of {allImages.length} images</p>
        )}
      </div>

      {/* Products missing images */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Products Missing Images ({productsWithoutImages.length})</h2>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-gray-500 uppercase">ID</th>
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-gray-500 uppercase">Product</th>
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-gray-500 uppercase">SKU</th>
              </tr>
            </thead>
            <tbody>
              {productsWithoutImages.slice(0, 50).map((p) => (
                <tr key={p.id} className="border-b border-gray-50">
                  <td className="px-3 py-2 text-[12px] text-gray-400 font-mono">{p.id}</td>
                  <td className="px-3 py-2 text-[13px] text-gray-700 line-clamp-1">{p.name}</td>
                  <td className="px-3 py-2 text-[12px] text-gray-500 font-mono">{p.sku || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {productsWithoutImages.length > 50 && (
            <p className="text-[12px] text-gray-400 text-center mt-2">Showing 50 of {productsWithoutImages.length}</p>
          )}
        </div>
      </div>
    </div>
  );
}
