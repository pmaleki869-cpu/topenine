"use client";

import { useState, useTransition } from "react";
import { exportData, changeAdminPassword } from "@/lib/admin-actions";
import { toast } from "sonner";
import {
  Download, Loader2, FileJson, FileSpreadsheet,
  Settings, Lock, Shield, ClipboardList, Search, Link as LinkIcon,
  Save, Eye, EyeOff,
} from "lucide-react";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();

  /* ─── General Settings (read-only in static-JSON scope) ─── */
  const [storeName] = useState("TopEngine");
  const [storeEmail] = useState("info@topengine.ae");
  const [storePhone] = useState("+971 55 152 1264");
  const [currency] = useState("AED");
  const [timezone] = useState("Asia/Dubai (UTC+4)");
  const [whatsApp] = useState("+971551521264");

  /* ─── Password Change ─── */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwPending, setPwPending] = useState(false);

  function handleExport(format: "json" | "csv") {
    startTransition(async () => {
      const result = await exportData(format);
      if (result.success && result.data) {
        const blob = new Blob([result.data], {
          type: format === "json" ? "application/json" : "text/csv",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `topengine-products.${format}`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Exported as ${format.toUpperCase()}`);
      } else if (!result.success) {
        toast.error(result.error);
      }
    });
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPw.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    setPwPending(true);
    try {
      const result = await changeAdminPassword(currentPw, newPw);
      if (result.success) {
        toast.success("Password verified — in production this would persist the change");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Password change failed");
    } finally {
      setPwPending(false);
    }
  }

  const futureSections = [
    { title: "Users & Roles", description: "Admin accounts, role-based access control", icon: Shield, status: "Planned — requires database" },
    { title: "Audit Log", description: "Track all admin actions and data changes", icon: ClipboardList, status: "Planned — requires database" },
    { title: "SEO Templates", description: "Meta templates, Open Graph defaults", icon: Search, status: "Managed via Next.js metadata API" },
    { title: "Integrations", description: "WhatsApp, analytics, payment gateways", icon: LinkIcon, status: "WhatsApp configured — others planned" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[20px] font-bold text-gray-900">Settings</h1>
        <p className="text-[13px] text-gray-500">System configuration and administration</p>
      </div>

      {/* ─── General Settings ─── */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-start gap-3 mb-5">
          <Settings className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">General Settings</h3>
            <p className="text-[12px] text-gray-500 mt-0.5">Store information and regional configuration</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Store Name", value: storeName },
            { label: "Contact Email", value: storeEmail },
            { label: "Phone", value: storePhone },
            { label: "WhatsApp", value: whatsApp },
            { label: "Currency", value: currency },
            { label: "Timezone", value: timezone },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-[12px] font-medium text-gray-500 mb-1">{label}</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-900">
                {value}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1">
          <Save className="w-3 h-3" />
          Editable when connected to a database backend
        </p>
      </div>

      {/* ─── Password Change ─── */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-start gap-3 mb-5">
          <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">Change Password</h3>
            <p className="text-[12px] text-gray-500 mt-0.5">Update your admin account password</p>
          </div>
        </div>
        <form onSubmit={handlePasswordChange} className="max-w-md space-y-3">
          <div>
            <label className="block text-[12px] font-medium text-gray-600 mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                required
                className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-600 mb-1">New Password</label>
            <input
              type={showPw ? "text" : "password"}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
              minLength={8}
              className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-600 mb-1">Confirm New Password</label>
            <input
              type={showPw ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              minLength={8}
              className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
              placeholder="Re-enter new password"
            />
          </div>
          <button
            type="submit"
            disabled={pwPending || !currentPw || !newPw || !confirmPw}
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            {pwPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Update Password
          </button>
        </form>
      </div>

      {/* ─── Data Export ─── */}
      <div className="bg-white rounded-xl border border-blue-200 p-5">
        <div className="flex items-start gap-3 mb-4">
          <Download className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">Data Export</h3>
            <p className="text-[12px] text-gray-500 mt-1">Download your full product catalog as JSON or CSV</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("json")}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileJson className="w-4 h-4" />}
            Export JSON
          </button>
          <button
            onClick={() => handleExport("csv")}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
            Export CSV
          </button>
        </div>
      </div>

      {/* ─── Future Modules ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {futureSections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-3">
              <section.icon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-gray-900">{section.title}</h3>
                <p className="text-[12px] text-gray-500 mt-1">{section.description}</p>
                <span className="inline-flex mt-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 uppercase tracking-wide">
                  {section.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Current Configuration ─── */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Current Configuration</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {[
            { label: "Data Source", value: "Static JSON", color: "" },
            { label: "Framework", value: "Next.js (App Router)", color: "" },
            { label: "Deployment", value: "Vercel", color: "" },
            { label: "Currency", value: "AED", color: "" },
            { label: "Authentication", value: "JWT (jose) \u2713", color: "text-emerald-600" },
            { label: "Data Layer", value: "JSON + Server Actions \u2713", color: "text-emerald-600" },
            { label: "Phase", value: "5 — Production Ready \u2713", color: "text-emerald-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
              <dt className="text-[13px] text-gray-500">{label}</dt>
              <dd className={`text-[13px] font-medium ${color || "text-gray-900"}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
