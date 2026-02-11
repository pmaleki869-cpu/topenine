export default function SettingsPage() {
  const settingSections = [
    {
      title: "General",
      description: "Site name, currency, contact info, timezone",
      icon: "⚙️",
      status: "coming-soon",
    },
    {
      title: "Users & Roles",
      description: "Admin accounts, role-based access control (RBAC)",
      icon: "👥",
      status: "coming-soon",
    },
    {
      title: "Audit Log",
      description: "Track all admin actions and changes",
      icon: "📋",
      status: "coming-soon",
    },
    {
      title: "SEO",
      description: "Meta templates, Open Graph defaults, sitemap settings",
      icon: "🔍",
      status: "coming-soon",
    },
    {
      title: "Integrations",
      description: "WhatsApp, analytics, payment gateways",
      icon: "🔗",
      status: "coming-soon",
    },
    {
      title: "Import / Export",
      description: "Bulk data import/export, CSV/JSON tools",
      icon: "📦",
      status: "coming-soon",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[20px] font-bold text-gray-900">Settings</h1>
        <p className="text-[13px] text-gray-500">System configuration and administration</p>
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
            <dd className="text-[13px] font-medium text-amber-600">Not configured</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-[13px] text-gray-500">Database</dt>
            <dd className="text-[13px] font-medium text-amber-600">Not configured</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
