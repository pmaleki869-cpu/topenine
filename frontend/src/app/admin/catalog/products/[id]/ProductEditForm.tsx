"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Save,
  X,
  Trash2,
  ExternalLink,
  Loader2,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import type { Product, Category } from "@/types";
import { updateProduct, deleteProduct, updateProductImage } from "@/lib/admin-actions";
import { generateSlug, parsePrice } from "@/lib/validations";

interface Props {
  product: Product;
  allCategories: Category[];
}

export default function ProductEditForm({ product, allCategories }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku);
  const [slug, setSlug] = useState(product.slug);
  const [shortDesc, setShortDesc] = useState(product.short_description);
  const [description, setDescription] = useState(product.description_raw);
  const [type, setType] = useState<"simple" | "variable">(product.type);
  const [priceAed, setPriceAed] = useState(product.price_aed.toString());
  const [regularPrice, setRegularPrice] = useState(product.regular_price_aed.toString());
  const [salePrice, setSalePrice] = useState(product.sale_price_aed.toString());
  const [onSale, setOnSale] = useState(product.on_sale);
  const [inStock, setInStock] = useState(product.is_in_stock);
  const [purchasable, setPurchasable] = useState(product.is_purchasable);
  const [selectedCats, setSelectedCats] = useState<number[]>(
    product.categories.map((c) => c.id)
  );
  const [tagInput, setTagInput] = useState(product.tags.map((t) => t.name).join(", "));
  const [brandInput, setBrandInput] = useState(product.brands.join(", "));
  const [imageUrl, setImageUrl] = useState(product.primary_image_url || "");

  const [dirty, setDirty] = useState(false);

  function markDirty() {
    if (!dirty) setDirty(true);
  }

  function handleSave() {
    startTransition(async () => {
      const result = await updateProduct(product.id, {
        name,
        sku,
        slug,
        short_description: shortDesc,
        description_raw: description,
        type,
        price_aed: parsePrice(priceAed),
        regular_price_aed: parsePrice(regularPrice),
        sale_price_aed: parsePrice(salePrice),
        on_sale: onSale,
        is_in_stock: inStock,
        is_purchasable: purchasable,
        category_ids: selectedCats,
        tag_names: tagInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        brand_names: brandInput
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
      });

      if (result.success) {
        toast.success(result.message);
        setDirty(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProduct(product.id);
      if (result.success) {
        toast.success(result.message);
        router.push("/admin/catalog/products");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function toggleCategory(catId: number) {
    markDirty();
    setSelectedCats((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/catalog/products"
              className="text-[12px] text-gray-500 hover:text-blue-600"
            >
              ← Products
            </Link>
          </div>
          <h1 className="text-[18px] font-bold text-gray-900 line-clamp-2">
            {name || "Untitled Product"}
          </h1>
          <p className="text-[12px] text-gray-400 font-mono">
            ID: {product.id} · SKU: {sku || "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <span className="text-[11px] text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-md">
              Unsaved changes
            </span>
          )}
          <Link
            href={`/product/${product.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View on store
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={isPending || !dirty}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Delete Product</h3>
                <p className="text-[13px] text-gray-500 mt-1">
                  Are you sure you want to delete &quot;{product.name}&quot;? This action cannot be
                  undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-[13px] font-medium rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Core Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">
              Core Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="pname" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Product Name *
                </label>
                <input
                  id="pname"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); markDirty(); }}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="psku" className="block text-[12px] font-medium text-gray-500 mb-1">
                    SKU
                  </label>
                  <input
                    id="psku"
                    type="text"
                    value={sku}
                    onChange={(e) => { setSku(e.target.value); markDirty(); }}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="pslug" className="block text-[12px] font-medium text-gray-500 mb-1">
                    Slug
                    <button
                      type="button"
                      onClick={() => { setSlug(generateSlug(name)); markDirty(); }}
                      className="ml-2 text-blue-500 hover:text-blue-700 text-[11px]"
                    >
                      Auto-generate
                    </button>
                  </label>
                  <input
                    id="pslug"
                    type="text"
                    value={slug}
                    onChange={(e) => { setSlug(e.target.value); markDirty(); }}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pshort" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Short Description
                </label>
                <textarea
                  id="pshort"
                  value={shortDesc}
                  onChange={(e) => { setShortDesc(e.target.value); markDirty(); }}
                  rows={3}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="pdesc" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Full Description
                </label>
                <textarea
                  id="pdesc"
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); markDirty(); }}
                  rows={5}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Pricing</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="pprice" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Price (AED) *
                </label>
                <input
                  id="pprice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={priceAed}
                  onChange={(e) => { setPriceAed(e.target.value); markDirty(); }}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="pregprice" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Regular Price (AED)
                </label>
                <input
                  id="pregprice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={regularPrice}
                  onChange={(e) => { setRegularPrice(e.target.value); markDirty(); }}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="psaleprice" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Sale Price (AED)
                </label>
                <input
                  id="psaleprice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={salePrice}
                  onChange={(e) => { setSalePrice(e.target.value); markDirty(); }}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
              <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => { setOnSale(e.target.checked); markDirty(); }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                On Sale
              </label>
              <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={purchasable}
                  onChange={(e) => { setPurchasable(e.target.checked); markDirty(); }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Purchasable
              </label>
            </div>
          </div>

          {/* Tags + Brands */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Tags & Brands</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="ptags" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  id="ptags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => { setTagInput(e.target.value); markDirty(); }}
                  placeholder="e.g. Toyota, Hilux, 2GD-FTV"
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="pbrands" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Brands (comma separated)
                </label>
                <input
                  id="pbrands"
                  type="text"
                  value={brandInput}
                  onChange={(e) => { setBrandInput(e.target.value); markDirty(); }}
                  placeholder="e.g. Toyota, Denso"
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Attributes (read-only for now) */}
          {product.attributes.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Attributes</h2>
              <div className="space-y-3">
                {product.attributes.map((attr) => (
                  <div key={attr.id}>
                    <div className="text-[12px] font-medium text-gray-500 mb-1">
                      {attr.name}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {attr.terms.map((t) => (
                        <span
                          key={t.id}
                          className="px-2.5 py-1 text-[12px] bg-blue-50 text-blue-700 rounded-md font-medium"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — 1 col */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="ptype" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Product Type
                </label>
                <select
                  id="ptype"
                  value={type}
                  onChange={(e) => { setType(e.target.value as "simple" | "variable"); markDirty(); }}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="simple">Simple</option>
                  <option value="variable">Variable</option>
                </select>
              </div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[13px] text-gray-700">In Stock</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={inStock}
                  onClick={() => { setInStock(!inStock); markDirty(); }}
                  className={`relative w-10 h-[22px] rounded-full transition-colors ${inStock ? "bg-emerald-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform shadow-sm ${inStock ? "translate-x-[18px]" : ""}`}
                  />
                </button>
              </label>
              <div className="flex justify-between text-[13px] text-gray-500">
                <span>Variations</span>
                <span className="font-medium text-gray-900">
                  {product.variations.length}
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">
              Primary Image
            </h2>
            <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                    <X className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-[12px] text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="mt-3 space-y-2">
              <label htmlFor="imageUrl" className="block text-[11px] font-medium text-gray-500 uppercase">Image URL</label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); markDirty(); }}
                placeholder="https://..."
                className="w-full px-3 py-2 text-[12px] font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                onClick={() => {
                  startTransition(async () => {
                    const result = await updateProductImage(product.id, imageUrl.trim());
                    if (result.success) toast.success("Image updated");
                    else toast.error(result.error);
                  });
                }}
                disabled={isPending}
                className="w-full py-2 text-[12px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
              >
                {isPending ? "Saving…" : "Save Image"}
              </button>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {product.images.slice(0, 4).map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => { setImageUrl(img.src); markDirty(); }}
                    className="aspect-square rounded bg-gray-100 overflow-hidden border border-gray-200 hover:border-blue-400 cursor-pointer"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">
              Categories
            </h2>
            <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
              {allCategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
