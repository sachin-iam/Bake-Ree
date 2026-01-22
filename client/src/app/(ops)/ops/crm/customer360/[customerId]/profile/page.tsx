"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "@/components/crm/ChartCard";
import KpiCard from "@/components/crm/KpiCard";
import InsightPills from "@/components/crm/InsightPills";
import PointsLedgerTable from "@/components/crm/PointsLedgerTable";
import StreakWidget from "@/components/crm/StreakWidget";
import { pointsLedger } from "@/lib/crm/mockData";

const spendTrend = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 98 },
  { day: "Wed", value: 140 },
  { day: "Thu", value: 160 },
  { day: "Fri", value: 210 },
  { day: "Sat", value: 180 },
  { day: "Sun", value: 130 },
];

const frequencyTrend = [
  { week: "W1", value: 1 },
  { week: "W2", value: 2 },
  { week: "W3", value: 1 },
  { week: "W4", value: 3 },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-4">
        <KpiCard label="CLV" value="$4,820" delta="+8%" tone="positive" />
        <KpiCard label="Orders (90d)" value="18" delta="+3" />
        <KpiCard label="Avg Order" value="$26.8" delta="+1.1%" />
        <KpiCard label="Repeat Rate" value="62%" delta="+4.2%" tone="positive" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Spend trend" subtitle="Daily spend (last 7 days)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendTrend}>
              <Line type="monotone" dataKey="value" stroke="#1f7a6b" strokeWidth={2} />
              <Tooltip cursor={{ stroke: "#efeae2" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Frequency trend" subtitle="Visits per week">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={frequencyTrend}>
              <Line type="monotone" dataKey="value" stroke="#2a2927" strokeWidth={2} />
              <Tooltip cursor={{ stroke: "#efeae2" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <InsightPills label="Mood tags" items={["Celebration", "Comfort", "Morning routine"]} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PointsLedgerTable rows={pointsLedger} />
        <StreakWidget current={6} best={10} nextMilestone={8} />
      </section>
    </div>
  );
}
