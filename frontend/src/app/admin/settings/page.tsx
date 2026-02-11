"use client";

import { useState, useTransition } from "react";
import { exportData } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Download, Loader2, FileJson, FileSpreadsheet } from "lucide-react";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();

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

  const settingSections = [
    {
      title: "General",
      description: "Site name, currency, contact info, timezone",
      icon: "\u2699\uFE0F",
      status: "coming-soon",
    },
    {
      title: "Users & Roles",
      description: "Admin accounts, role-based access control (RBAC)",
      icon: "\uD83D\uDC65",
      status: "coming-soon",
    },
    {
      title: "Audit Log",
      description: "Track all admin actions and changes",
      icon: "\uD83D\uDCCB",
      status: "coming-soon",
    },
    {
      title: "SEO",
      description: "Meta templates, Open Graph defaults, sitemap settings",
      icon: "\uD83D\uDD0D",
      status: "coming-soon",
    },
    {
      title: "Integrations",
      description: "WhatsApp, analytics, payment gateways",
      icon: "\uD83D\uDD17",
      status: "coming-soon",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[20px] font-bold text-gray-900">Settings</h1>
        <p className="text-[13px] text-gray-500">System configuration and administration</p>
      </div>

      {/* Data Export — functional */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingSections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-[24px]">{section.icon}</span>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-gray-900">{section.title}</h3>
                <p className="text-[12px] text-gray-500 mt-1">{section.description}</p>
                <span className="inline-flex mt-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current config info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Current Configuration</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Data Source</dt>
            <dd className="text-[13px] font-medium text-gray-900">Static JSON</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Framework</dt>
            <dd className="text-[13px] font-medium text-gray-900">Next.js (App Router)</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Deployment</dt>
            <dd className="text-[13px] font-medium text-gray-900">Vercel</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Currency</dt>
            <dd className="text-[13px] font-medium text-gray-900">AED</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Authentication</dt>
            <dd className="text-[13px] font-medium text-emerald-600">JWT (jose) \u2713</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Data Layer</dt>
            <dd className="text-[13px] font-medium text-emerald-600">JSON + Server Actions \u2713</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Phase</dt>
            <dd className="text-[13px] font-medium text-emerald-600">3 — Media, Tags & Operations \u2713</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
