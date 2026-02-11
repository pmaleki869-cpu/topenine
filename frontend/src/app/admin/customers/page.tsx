export default function CustomersPage() {
  // Placeholder — no customer system exists yet  
  const mockCustomers = [
    { id: 1, name: "Ahmed Al Maktoum", email: "ahmed@example.ae", phone: "+971 50 123 4567", orders: 5, totalSpent: 12500, lastOrder: "2026-02-10", segment: "repeat" },
    { id: 2, name: "Khalid Hassan", email: "khalid@example.ae", phone: "+971 55 987 6543", orders: 2, totalSpent: 3890, lastOrder: "2026-02-09", segment: "active" },
    { id: 3, name: "Mohammed Ali", email: "mohammed@example.ae", phone: "+971 52 555 1212", orders: 1, totalSpent: 2100, lastOrder: "2026-02-08", segment: "new" },
    { id: 4, name: "Fatima Rashid", email: "fatima@example.ae", phone: "+971 56 444 3333", orders: 8, totalSpent: 24300, lastOrder: "2026-02-07", segment: "vip" },
    { id: 5, name: "Omar Saeed", email: "omar@example.ae", phone: "+971 54 222 1111", orders: 3, totalSpent: 5400, lastOrder: "2026-02-06", segment: "active" },
  ];

  const segmentColors: Record<string, string> = {
    new: "bg-blue-50 text-blue-700",
    active: "bg-emerald-50 text-emerald-700",
    repeat: "bg-violet-50 text-violet-700",
    vip: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Customers</h1>
          <p className="text-[13px] text-gray-500">Customer relationship management</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        <div>
          <p className="text-[13px] font-medium text-amber-800">No customer database connected</p>
          <p className="text-[12px] text-amber-700 mt-1">Customer data shown below is sample data for layout preview. Connect authentication and a backend database to enable real customer management.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Contact</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Orders</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Total Spent</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Last Order</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Segment</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[12px] font-bold text-blue-700 shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-[13px] font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[12px] text-gray-600">{c.email}</div>
                  <div className="text-[11px] text-gray-400 font-mono">{c.phone}</div>
                </td>
                <td className="px-5 py-3 text-[13px] text-gray-900 text-right font-medium">{c.orders}</td>
                <td className="px-5 py-3 text-[13px] font-medium text-gray-900 text-right font-mono">AED {c.totalSpent.toLocaleString()}</td>
                <td className="px-5 py-3 text-[13px] text-gray-600">{c.lastOrder}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${segmentColors[c.segment] || "bg-gray-50 text-gray-700"}`}>
                    {c.segment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
