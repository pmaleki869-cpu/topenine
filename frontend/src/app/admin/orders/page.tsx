"use client";

import { useState, useTransition, useEffect } from "react";
import {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from "@/lib/admin-actions";
import type { Inquiry } from "@/lib/admin-actions";
import { toast } from "sonner";
import {
  Plus,
  Loader2,
  X,
  Phone,
  MessageCircle,
  Trash2,
  ChevronRight,
  Search,
} from "lucide-react";

const STATUS_FLOW = [
  "new",
  "contacted",
  "quoted",
  "confirmed",
  "shipped",
  "closed",
] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
  quoted: "bg-purple-50 text-purple-700 border-purple-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shipped: "bg-cyan-50 text-cyan-700 border-cyan-200",
  closed: "bg-gray-50 text-gray-500 border-gray-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function OrdersPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form fields
  const [fName, setFName] = useState("");
  const [fPhone, setFPhone] = useState("");
  const [fNotes, setFNotes] = useState("");
  const [fTotal, setFTotal] = useState("");

  // Load on mount
  useEffect(() => {
    startTransition(async () => {
      const data = await getInquiries();
      setInquiries(data);
      setLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCreate() {
    if (!fName.trim()) {
      toast.error("Customer name is required");
      return;
    }
    startTransition(async () => {
      const result = await createInquiry({
        customer_name: fName.trim(),
        phone: fPhone.trim(),
        product_ids: [],
        notes: fNotes.trim(),
        total_aed: parseFloat(fTotal) || 0,
      });
      if (result.success) {
        toast.success("Inquiry created");
        const reload = await getInquiries();
        setInquiries(reload);
        setShowForm(false);
        setFName("");
        setFPhone("");
        setFNotes("");
        setFTotal("");
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleStatusChange(id: number, newStatus: string) {
    startTransition(async () => {
      const result = await updateInquiryStatus(id, newStatus as Inquiry["status"]);
      if (result.success) {
        toast.success(`Status updated to ${newStatus}`);
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as Inquiry["status"], updated_at: new Date().toISOString() } : inq))
        );
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteInquiry(id);
      if (result.success) {
        toast.success("Inquiry deleted");
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      } else {
        toast.error(result.error);
      }
      setDeletingId(null);
    });
  }

  function getNextStatus(current: string) {
    const idx = STATUS_FLOW.indexOf(current as (typeof STATUS_FLOW)[number]);
    if (idx >= 0 && idx < STATUS_FLOW.length - 1) return STATUS_FLOW[idx + 1];
    return null;
  }

  function whatsappLink(phone: string) {
    const clean = phone.replace(/\D/g, "");
    return `https://wa.me/${clean}`;
  }

  const filtered = search
    ? inquiries.filter(
        (i) =>
          i.customer_name.toLowerCase().includes(search.toLowerCase()) ||
          i.phone.includes(search) ||
          i.status.includes(search.toLowerCase())
      )
    : inquiries;

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
          <h1 className="text-[20px] font-bold text-gray-900">Inquiries</h1>
          <p className="text-[13px] text-gray-500">
            WhatsApp inquiry tracker &middot; {inquiries.length} total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> New Inquiry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {(["new", "contacted", "quoted", "confirmed"] as const).map((s) => {
          const count = inquiries.filter((i) => i.status === s).length;
          return (
            <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-[24px] font-bold text-gray-900">{count}</div>
              <div className="text-[11px] text-gray-500 capitalize">{s}</div>
            </div>
          );
        })}
      </div>

      {/* New inquiry form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-gray-900">New Inquiry</h2>
            <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Customer Name *</label>
              <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="Ahmed Ali" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Phone / WhatsApp</label>
              <input type="text" value={fPhone} onChange={(e) => setFPhone(e.target.value)} placeholder="+971 50 123 4567" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Total (AED)</label>
              <input type="number" value={fTotal} onChange={(e) => setFTotal(e.target.value)} placeholder="0.00" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Notes</label>
              <input type="text" value={fNotes} onChange={(e) => setFNotes(e.target.value)} placeholder="Customer asked about..." className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCreate}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create Inquiry
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
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Inquiries table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Customer</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Phone</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Status</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Total</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Notes</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase w-36">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((inq) => {
              const next = getNextStatus(inq.status);
              return (
                <tr key={inq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-[13px] font-medium text-gray-900">{inq.customer_name}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-gray-600 font-mono">{inq.phone || "\u2014"}</span>
                      {inq.phone && (
                        <div className="flex gap-1">
                          <a href={whatsappLink(inq.phone)} target="_blank" rel="noopener noreferrer" className="p-1 rounded hover:bg-emerald-50 text-gray-400 hover:text-emerald-600" aria-label="WhatsApp">
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <a href={`tel:${inq.phone}`} className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600" aria-label="Call">
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-[11px] font-semibold rounded-full border capitalize ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-[13px] font-medium text-gray-900">
                    {inq.total_aed > 0 ? `${inq.total_aed.toLocaleString()} AED` : "\u2014"}
                  </td>
                  <td className="px-5 py-3 text-[12px] text-gray-500 max-w-[200px] truncate">{inq.notes || "\u2014"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {next && (
                        <button
                          onClick={() => handleStatusChange(inq.id, next)}
                          disabled={isPending}
                          className="inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-medium rounded bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-40 capitalize"
                        >
                          {next} <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                      {inq.status !== "cancelled" && inq.status !== "closed" && (
                        <button
                          onClick={() => handleStatusChange(inq.id, "cancelled")}
                          disabled={isPending}
                          className="px-2 py-1 text-[11px] font-medium rounded bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        >
                          Cancel
                        </button>
                      )}
                      {deletingId === inq.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(inq.id)} disabled={isPending} className="px-2 py-1 text-[11px] font-medium rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-40">
                            Delete
                          </button>
                          <button onClick={() => setDeletingId(null)} className="px-2 py-1 text-[11px] font-medium rounded border border-gray-200 text-gray-500">
                            No
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDeletingId(inq.id)} className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600" aria-label="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-[13px] text-gray-400">
              {inquiries.length === 0 ? "No inquiries yet \u2014 create one above" : "No inquiries match your search"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
