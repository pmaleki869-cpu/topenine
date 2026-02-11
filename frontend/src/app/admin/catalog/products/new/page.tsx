"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import { createProduct } from "@/lib/admin-actions";
import { generateSlug, parsePrice } from "@/lib/validations";
import type { Category } from "@/types";
import { getCategories } from "@/lib/products";

export default function NewProductPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => { setCategories(getCategories()); }, []);

  // Form state
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"simple" | "variable">("simple");
  const [priceAed, setPriceAed] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [purchasable, setPurchasable] = useState(true);
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [brandInput, setBrandInput] = useState("");

  // Auto-generate slug from name
  useEffect(() => {
    if (name && !slug) {
      setSlug(generateSlug(name));
    }
  }, [name, slug]);

  function handleCreate() {
    startTransition(async () => {
      const result = await createProduct({
        name,
        sku,
        slug: slug || generateSlug(name),
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
        tag_names: tagInput.split(",").map((t) => t.trim()).filter(Boolean),
        brand_names: brandInput.split(",").map((b) => b.trim()).filter(Boolean),
      });

      if (result.success && "id" in result) {
        toast.success(result.message);
        router.push(`/admin/catalog/products/${result.id}`);
        router.refresh();
      } else if (!result.success) {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Link
            href="/admin/catalog/products"
            className="inline-flex items-center gap-1 text-[12px] text-gray-500 hover:text-blue-600 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Products
          </Link>
          <h1 className="text-[20px] font-bold text-gray-900">New Product</h1>
        </div>
        <button
          onClick={handleCreate}
          disabled={isPending || !name.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Core Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Core Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cname" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Product Name *
                </label>
                <input
                  id="cname"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. OEM Water Pump for Toyota Hilux 2GD-FTV"
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="csku" className="block text-[12px] font-medium text-gray-500 mb-1">
                    SKU
                  </label>
                  <input
                    id="csku"
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. TE-WP-2GD-001"
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="cslug" className="block text-[12px] font-medium text-gray-500 mb-1">
                    Slug
                  </label>
                  <input
                    id="cslug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cshort" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Short Description
                </label>
                <textarea
                  id="cshort"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cdesc" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Full Description
                </label>
                <textarea
                  id="cdesc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <label htmlFor="cprice" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Price (AED) *
                </label>
                <input
                  id="cprice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={priceAed}
                  onChange={(e) => setPriceAed(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cregprice" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Regular Price (AED)
                </label>
                <input
                  id="cregprice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="csaleprice" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Sale Price (AED)
                </label>
                <input
                  id="csaleprice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
              <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                On Sale
              </label>
              <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={purchasable}
                  onChange={(e) => setPurchasable(e.target.checked)}
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
                <label htmlFor="ctags" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  id="ctags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. Toyota, Hilux, 2GD-FTV"
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cbrands" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Brands (comma separated)
                </label>
                <input
                  id="cbrands"
                  type="text"
                  value={brandInput}
                  onChange={(e) => setBrandInput(e.target.value)}
                  placeholder="e.g. Toyota, Denso"
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="ctype" className="block text-[12px] font-medium text-gray-500 mb-1">
                  Product Type
                </label>
                <select
                  id="ctype"
                  value={type}
                  onChange={(e) => setType(e.target.value as "simple" | "variable")}
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
                  onClick={() => setInStock(!inStock)}
                  className={`relative w-10 h-[22px] rounded-full transition-colors ${inStock ? "bg-emerald-500" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform shadow-sm ${inStock ? "translate-x-[18px]" : ""}`} />
                </button>
              </label>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-1.5 max-h-[250px] overflow-y-auto">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat.id)}
                    onChange={() =>
                      setSelectedCats((prev) =>
                        prev.includes(cat.id)
                          ? prev.filter((id) => id !== cat.id)
                          : [...prev, cat.id]
                      )
                    }
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
