"use client";

import { useState, useMemo, useTransition } from "react";
import { getCategories, getAllProducts } from "@/lib/products";
import { createCategory, updateCategory, deleteCategory } from "@/lib/admin-actions";
import { generateSlug } from "@/lib/validations";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = useMemo(() => getCategories(), []);
  const allProducts = useMemo(() => getAllProducts(), []);
  const [isPending, startTransition] = useTransition();

  const categoriesWithCounts = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        productCount: allProducts.filter((p) => p.categories.some((c) => c.id === cat.id)).length,
      })),
    [categories, allProducts]
  );

  // Inline edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Create state
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Delete confirm state
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function startEdit(cat: (typeof categoriesWithCounts)[0]) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditDesc(cat.description || "");
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleSaveEdit() {
    if (!editingId) return;
    startTransition(async () => {
      const result = await updateCategory(editingId, {
        name: editName,
        slug: editSlug || generateSlug(editName),
        description: editDesc,
      });
      if (result.success) {
        toast.success(result.message);
        setEditingId(null);
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleCreate() {
    startTransition(async () => {
      const result = await createCategory({
        name: newName,
        slug: newSlug || generateSlug(newName),
        description: newDesc,
      });
      if (result.success) {
        toast.success(result.message);
        setShowCreate(false);
        setNewName("");
        setNewSlug("");
        setNewDesc("");
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteCategory(id);
      if (result.success) {
        toast.success(result.message);
        setDeleteId(null);
      } else {
        toast.error(result.error);
        setDeleteId(null);
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Categories</h1>
          <p className="text-[13px] text-gray-500">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Create row */}
      {showCreate && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">New Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Name *"
              value={newName}
              onChange={(e) => { setNewName(e.target.value); if (!newSlug) setNewSlug(generateSlug(e.target.value)); }}
              className="px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Slug"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              className="px-3 py-2 text-[13px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCreate}
              disabled={isPending || !newName.trim()}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
            >
              {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Create
            </button>
            <button
              onClick={() => { setShowCreate(false); setNewName(""); setNewSlug(""); setNewDesc(""); }}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[12px] font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide w-12">ID</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Slug</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Description</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Products</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">WC Count</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesWithCounts.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                <td className="px-5 py-3 text-[12px] text-gray-400 font-mono">{cat.id}</td>

                {editingId === cat.id ? (
                  <>
                    <td className="px-5 py-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 text-[13px] border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </td>
                    <td className="px-5 py-2">
                      <input
                        type="text"
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="w-full px-2 py-1 text-[12px] font-mono border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </td>
                    <td className="px-5 py-2">
                      <input
                        type="text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full px-2 py-1 text-[12px] border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </td>
                  </>
                ) : (
                  <>
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
                  </>
                )}

                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/catalog/products?category=${cat.slug}`} className="text-[13px] font-semibold text-blue-600 hover:text-blue-700">
                    {cat.productCount}
                  </Link>
                </td>
                <td className="px-5 py-3 text-right text-[12px] text-gray-400">{cat.count}</td>
                <td className="px-5 py-3 text-right">
                  {editingId === cat.id ? (
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={handleSaveEdit} disabled={isPending} className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50" title="Save">
                        {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={cancelEdit} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100" title="Cancel">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : deleteId === cat.id ? (
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleDelete(cat.id)} disabled={isPending} className="px-2 py-1 text-[11px] font-semibold rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-40">
                        {isPending ? "…" : "Confirm"}
                      </button>
                      <button onClick={() => setDeleteId(null)} className="px-2 py-1 text-[11px] font-semibold rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => startEdit(cat)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50" title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(cat.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
