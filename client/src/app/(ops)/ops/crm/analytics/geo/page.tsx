"use client";

import { useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AreaSelector from "@/components/crm/AreaSelector";
import ChartCard from "@/components/crm/ChartCard";
import CrmSectionShell from "@/components/crm/CrmSectionShell";
import DataTable from "@/components/crm/DataTable";
import KpiCard from "@/components/crm/KpiCard";
import { areaInsights } from "@/lib/crm/mockData";

const revenueTrend = [
  { day: "Mon", value: 6.2 },
  { day: "Tue", value: 7.1 },
  { day: "Wed", value: 8.4 },
  { day: "Thu", value: 7.9 },
  { day: "Fri", value: 9.3 },
  { day: "Sat", value: 10.6 },
  { day: "Sun", value: 8.2 },
];

const productMix = [
  { category: "Cakes", value: 48 },
  { category: "Pastries", value: 30 },
  { category: "Coffee", value: 22 },
];

export default function Page() {
  const [area, setArea] = useState("Central");
  return (
    <CrmSectionShell
      title="Area-wise Dashboard"
      subtitle="Analytics"
      description="Area and zone performance with revenue, AOV, repeat rate, and churn signals."
    >
      <section className="flex flex-wrap items-center gap-4">
        <AreaSelector
          value={area}
          onChange={setArea}
          options={["Central", "North", "South"]}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Customers" value="3,420" />
        <KpiCard label="Revenue" value="$8.4k" delta="+3.1%" tone="positive" />
        <KpiCard label="Repeat Rate" value="48%" delta="+1.4%" tone="positive" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue trend" subtitle="Daily revenue ($k)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueTrend}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ stroke: "#efeae2" }} />
              <Line type="monotone" dataKey="value" stroke="#1f7a6b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Order count" subtitle="Daily orders">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueTrend} barSize={22}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "#f7f5f0" }} />
              <Bar dataKey="value" fill="#2a2927" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Product mix" subtitle="Category share">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productMix} barSize={22}>
              <XAxis dataKey="category" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "#f7f5f0" }} />
              <Bar dataKey="value" fill="#b08756" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <DataTable
        columns={[
          { key: "area", label: "Area" },
          { key: "revenue", label: "Revenue ($k)", align: "right" },
          { key: "orders", label: "Orders", align: "right" },
          { key: "mix", label: "Delivery share %", align: "right" },
        ]}
        data={areaInsights.map((area) => ({
          area: area.area,
          revenue: area.revenue.toString(),
          orders: area.orders.toString(),
          mix: area.mix.toString(),
        }))}
      />
    </CrmSectionShell>
  );
}
