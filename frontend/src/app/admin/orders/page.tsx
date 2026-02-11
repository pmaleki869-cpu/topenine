export default function OrdersPage() {
  // Placeholder — no order system exists yet (catalog + WhatsApp model)
  const mockOrders = [
    { id: "TE-2026-001", date: "2026-02-10", customer: "Ahmed Al Maktoum", items: 3, total: 4250, status: "pending" },
    { id: "TE-2026-002", date: "2026-02-09", customer: "Khalid Hassan", items: 1, total: 890, status: "processing" },
    { id: "TE-2026-003", date: "2026-02-08", customer: "Mohammed Ali", items: 2, total: 2100, status: "shipped" },
    { id: "TE-2026-004", date: "2026-02-07", customer: "Fatima Rashid", items: 5, total: 6750, status: "delivered" },
    { id: "TE-2026-005", date: "2026-02-06", customer: "Omar Saeed", items: 1, total: 1200, status: "cancelled" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    processing: "bg-blue-50 text-blue-700",
    shipped: "bg-violet-50 text-violet-700",
    delivered: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Orders</h1>
          <p className="text-[13px] text-gray-500">WhatsApp-based order tracking</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        <div>
          <p className="text-[13px] font-medium text-amber-800">No order system connected</p>
          <p className="text-[12px] text-amber-700 mt-1">TopEngine currently operates on a catalog + WhatsApp inquiry model. Orders shown below are sample data for layout preview. Connect a backend to enable real order management.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Order</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Items</th>
              <th scope="col" className="text-right px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Total</th>
              <th scope="col" className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3 text-[13px] font-semibold text-blue-600 font-mono">{order.id}</td>
                <td className="px-5 py-3 text-[13px] text-gray-600">{order.date}</td>
                <td className="px-5 py-3 text-[13px] text-gray-900">{order.customer}</td>
                <td className="px-5 py-3 text-[13px] text-gray-600 text-right">{order.items}</td>
                <td className="px-5 py-3 text-[13px] font-medium text-gray-900 text-right font-mono">AED {order.total.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${statusColors[order.status] || "bg-gray-50 text-gray-700"}`}>
                    {order.status}
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
