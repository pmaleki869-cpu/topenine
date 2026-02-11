"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface StockData {
  name: string;
  value: number;
}

interface CategoryData {
  name: string;
  count: number;
}

interface PriceData {
  range: string;
  count: number;
}

const STOCK_COLORS = ["#10b981", "#ef4444"];
const BAR_COLOR = "#3b82f6";
const PRICE_COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name?: string; payload?: { name?: string } }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-[12px]">
      <p className="font-medium text-gray-900">{label || payload[0]?.payload?.name}</p>
      <p className="text-gray-500">{payload[0].value.toLocaleString()} products</p>
    </div>
  );
}

export function StockDonut({ data }: { data: StockData[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">Stock Status</h3>
      <p className="text-[12px] text-gray-400 mb-4">{total} total products</p>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={STOCK_COLORS[i % STOCK_COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-[12px] text-gray-600">{value}</span>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryBarChart({ data }: { data: CategoryData[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">Products by Category</h3>
      <p className="text-[12px] text-gray-400 mb-4">Top {data.length} categories</p>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
            barSize={14}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="count" fill={BAR_COLOR} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PriceDistribution({ data }: { data: PriceData[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">Price Distribution</h3>
      <p className="text-[12px] text-gray-400 mb-4">AED price ranges</p>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -10, right: 4, top: 0, bottom: 0 }} barSize={28}>
            <XAxis
              dataKey="range"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={PRICE_COLORS[i % PRICE_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
