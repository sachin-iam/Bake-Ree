"use client";

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "@/components/crm/ChartCard";
import CrmSectionShell from "@/components/crm/CrmSectionShell";
import DataTable from "@/components/crm/DataTable";
import KpiCard from "@/components/crm/KpiCard";
import {
  crmKpis,
  revenueTrend,
  newVsReturning,
  outstandingAging,
  tierDistribution,
  topCustomers,
  atRiskCustomers,
  highOutstanding,
} from "@/lib/crm/mockData";

const tierColors = ["#e5d2b8", "#cdb08b", "#b08756", "#8c6a43"];

export default function Page() {
  return (
    <CrmSectionShell
      title="CRM Overview Dashboard"
      subtitle="Analytics"
      description="Unified CRM KPIs, revenue performance, loyalty liability, and retention trends."
    >
      <section className="grid gap-4 lg:grid-cols-4">
        {crmKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            tone={kpi.label.includes("Outstanding") ? "warning" : "neutral"}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue" subtitle="Daily revenue ($k)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueTrend} barSize={22}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "#f7f5f0" }} />
              <Bar dataKey="revenue" fill="#1f7a6b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Orders" subtitle="Daily order count">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueTrend}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ stroke: "#efeae2" }} />
              <Line type="monotone" dataKey="orders" stroke="#2a2927" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="New vs Returning" subtitle="Daily mix">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={newVsReturning} barSize={18}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "#f7f5f0" }} />
              <Bar dataKey="new" stackId="a" fill="#b08756" radius={[6, 6, 0, 0]} />
              <Bar dataKey="returning" stackId="a" fill="#1f7a6b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Outstanding aging" subtitle="Total outstanding by bucket">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outstandingAging} barSize={26}>
              <XAxis dataKey="bucket" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "#f7f5f0" }} />
              <Bar dataKey="value" fill="#9a5b13" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Tier distribution" subtitle="Customer share by tier">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tierDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
              >
                {tierDistribution.map((entry, index) => (
                  <Cell
                    key={`slice-${entry.name}`}
                    fill={tierColors[index % tierColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <DataTable
          columns={[
            { key: "name", label: "Top Customers" },
            { key: "clv", label: "CLV", align: "right" },
            { key: "orders", label: "Orders", align: "right" },
            { key: "churn", label: "Churn" },
          ]}
          data={topCustomers}
        />
        <DataTable
          columns={[
            { key: "name", label: "At-Risk" },
            { key: "lastOrder", label: "Last Order" },
            { key: "churn", label: "Risk" },
            { key: "owner", label: "Owner" },
          ]}
          data={atRiskCustomers}
        />
        <DataTable
          columns={[
            { key: "name", label: "Outstanding" },
            { key: "outstanding", label: "Amount", align: "right" },
            { key: "aging", label: "Aging" },
          ]}
          data={highOutstanding}
        />
      </section>
    </CrmSectionShell>
  );
}
