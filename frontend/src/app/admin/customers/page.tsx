"use client";

import { useState, useTransition, useEffect } from "react";
import {
  getLeads,
  createLead,
  updateLeadStatus,
  deleteLead,
} from "@/lib/admin-actions";
import type { Lead } from "@/lib/admin-actions";
import { toast } from "sonner";
import {
  Plus,
  Loader2,
  X,
  Phone,
  MessageCircle,
  Mail,
  Trash2,
  ChevronRight,
  Search,
  Users,
} from "lucide-react";

const STATUS_FLOW = ["new", "contacted", "qualified", "converted"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
  qualified: "bg-purple-50 text-purple-700 border-purple-200",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  lost: "bg-red-50 text-red-700 border-red-200",
};

const SOURCE_COLORS: Record<string, string> = {
  whatsapp: "bg-emerald-50 text-emerald-700",
  phone: "bg-blue-50 text-blue-700",
  website: "bg-violet-50 text-violet-700",
  referral: "bg-amber-50 text-amber-700",
  other: "bg-gray-50 text-gray-600",
};

export default function CustomersPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form fields
  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fPhone, setFPhone] = useState("");
  const [fSource, setFSource] = useState<Lead["source"]>("whatsapp");
  const [fNotes, setFNotes] = useState("");

  // Load on mount
  useEffect(() => {
    startTransition(async () => {
      const data = await getLeads();
      setLeads(data);
      setLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCreate() {
    if (!fName.trim()) {
      toast.error("Name is required");
      return;
    }
    startTransition(async () => {
      const result = await createLead({
        name: fName.trim(),
        email: fEmail.trim(),
        phone: fPhone.trim(),
        source: fSource,
        notes: fNotes.trim(),
      });
      if (result.success) {
        toast.success("Lead created");
        const reload = await getLeads();
        setLeads(reload);
        setShowForm(false);
        setFName("");
        setFEmail("");
        setFPhone("");
        setFSource("whatsapp");
        setFNotes("");
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleStatusChange(id: number, newStatus: string) {
    startTransition(async () => {
      const result = await updateLeadStatus(id, newStatus as Lead["status"]);
      if (result.success) {
        toast.success(`Status updated to ${newStatus}`);
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as Lead["status"], updated_at: new Date().toISOString() } : l))
        );
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteLead(id);
      if (result.success) {
        toast.success("Lead deleted");
        setLeads((prev) => prev.filter((l) => l.id !== id));
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
    return `https://wa.me/${phone.replace(/\D/g, "")}`;
  }

  const filtered = search
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.email.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.includes(search) ||
          l.source.includes(search.toLowerCase())
      )
    : leads;

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
          <h1 className="text-[20px] font-bold text-gray-900">Leads</h1>
          <p className="text-[13px] text-gray-500">
            Customer lead tracker &middot; {leads.length} total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> New Lead
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {(["new", "contacted", "qualified", "converted", "lost"] as const).map((s) => {
          const count = leads.filter((l) => l.status === s).length;
          return (
            <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-[24px] font-bold text-gray-900">{count}</div>
              <div className="text-[11px] text-gray-500 capitalize">{s}</div>
            </div>
          );
        })}
      </div>

      {/* New lead form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-gray-900">New Lead</h2>
            <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Name *</label>
              <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Email</label>
              <input type="email" value={fEmail} onChange={(e) => setFEmail(e.target.value)} placeholder="email@example.ae" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Phone / WhatsApp</label>
              <input type="text" value={fPhone} onChange={(e) => setFPhone(e.target.value)} placeholder="+971 50 123 4567" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Source</label>
              <select value={fSource} onChange={(e) => setFSource(e.target.value as Lead["source"])} className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">Phone Call</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-1">Notes</label>
              <input type="text" value={fNotes} onChange={(e) => setFNotes(e.target.value)} placeholder="Looking for parts for..." className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCreate}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create Lead
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
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Leads table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Name</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Contact</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Source</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Status</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase">Notes</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase w-36">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((lead) => {
              const next = getNextStatus(lead.status);
              return (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-bold text-blue-700 shrink-0">
                        {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-[13px] font-medium text-gray-900">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="text-[11px] text-gray-500 hover:text-blue-600 flex items-center gap-0.5">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-gray-500 font-mono">{lead.phone}</span>
                          <a href={whatsappLink(lead.phone)} target="_blank" rel="noopener noreferrer" className="p-0.5 rounded hover:bg-emerald-50 text-gray-400 hover:text-emerald-600">
                            <MessageCircle className="w-3 h-3" />
                          </a>
                          <a href={`tel:${lead.phone}`} className="p-0.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600">
                            <Phone className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {!lead.email && !lead.phone && <span className="text-[11px] text-gray-400">&mdash;</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize ${SOURCE_COLORS[lead.source] || SOURCE_COLORS.other}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-[11px] font-semibold rounded-full border capitalize ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[12px] text-gray-500 max-w-[180px] truncate">{lead.notes || "\u2014"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {next && (
                        <button
                          onClick={() => handleStatusChange(lead.id, next)}
                          disabled={isPending}
                          className="inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-medium rounded bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-40 capitalize"
                        >
                          {next} <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                      {lead.status !== "lost" && lead.status !== "converted" && (
                        <button
                          onClick={() => handleStatusChange(lead.id, "lost")}
                          disabled={isPending}
                          className="px-2 py-1 text-[11px] font-medium rounded bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        >
                          Lost
                        </button>
                      )}
                      {deletingId === lead.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(lead.id)} disabled={isPending} className="px-2 py-1 text-[11px] font-medium rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-40">
                            Delete
                          </button>
                          <button onClick={() => setDeletingId(null)} className="px-2 py-1 text-[11px] font-medium rounded border border-gray-200 text-gray-500">
                            No
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDeletingId(lead.id)} className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600" aria-label="Delete">
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
            <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-[13px] text-gray-400">
              {leads.length === 0 ? "No leads yet \u2014 create one above" : "No leads match your search"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
