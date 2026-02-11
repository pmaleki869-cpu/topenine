"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { getTags, createTag, updateTag, deleteTag } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Loader2, X, Tag } from "lucide-react";

interface TagItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
}

export default function TagsPage() {
  const [tags, setTags] = useState<TagItem[]>(() => {
    // Initial load via server action would be ideal,
    // but for static JSON we read at build. Use effect to hydrate.
    return [];
  });
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  // Create / Edit state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");

  // Delete confirm
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Load tags on mount
  useEffect(() => {
    startTransition(async () => {
      const data = await getTags();
      setTags(data as TagItem[]);
      setLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!search) return tags;
    const q = search.toLowerCase();
    return tags.filter(
      (t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q)
    );
  }, [tags, search]);

  function openCreate() {
    setEditingId(null);
    setFormName("");
    setShowForm(true);
  }

  function openEdit(tag: TagItem) {
    setEditingId(tag.id);
    setFormName(tag.name);
    setShowForm(true);
  }

  function handleSave() {
    if (!formName.trim()) {
      toast.error("Tag name is required");
      return;
    }
    startTransition(async () => {
      if (editingId) {
        const result = await updateTag(editingId, formName.trim());
        if (result.success) {
          toast.success("Tag updated");
          setTags((prev) =>
            prev.map((t) =>
              t.id === editingId ? { ...t, name: formName.trim(), slug: formName.trim().toLowerCase().replace(/\s+/g, "-") } : t
            )
          );
        } else {
          toast.error(result.error);
        }
      } else {
        const result = await createTag(formName.trim());
        if (result.success) {
          toast.success("Tag created");
          // Reload tags
          const reload = await getTags();
          setTags(reload as TagItem[]);
        } else {
          toast.error(result.error);
        }
      }
      setShowForm(false);
      setFormName("");
      setEditingId(null);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteTag(id);
      if (result.success) {
        toast.success("Tag deleted");
        setTags((prev) => prev.filter((t) => t.id !== id));
      } else {
        toast.error(result.error);
      }
      setDeletingId(null);
    });
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Tags</h1>
          <p className="text-[13px] text-gray-500">{tags.length} tags</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> New Tag
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-semibold text-gray-900">
              {editingId ? "Edit Tag" : "New Tag"}
            </h2>
            <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Tag name"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="flex-1 px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tags..."
            aria-label="Search tags"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tags table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Name</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Slug</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Products</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[13px] font-medium text-gray-900">{tag.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[12px] text-gray-500 font-mono">{tag.slug}</td>
                <td className="px-5 py-3 text-right">
                  <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 text-[11px] font-medium rounded-full ${tag.count > 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-400"}`}>
                    {tag.count}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(tag)} className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600" aria-label={`Edit ${tag.name}`}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {deletingId === tag.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(tag.id)}
                          disabled={isPending}
                          className="px-2 py-1 text-[11px] font-medium rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-40"
                        >
                          Confirm
                        </button>
                        <button onClick={() => setDeletingId(null)} className="px-2 py-1 text-[11px] font-medium rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeletingId(tag.id)} className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600" aria-label={`Delete ${tag.name}`}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[13px] text-gray-400">
            {search ? "No tags match your search" : "No tags yet"}
          </div>
        )}
      </div>
    </div>
  );
}
