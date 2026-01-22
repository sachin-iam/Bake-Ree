import CrmSectionShell from "@/components/crm/CrmSectionShell";
import DataTable from "@/components/crm/DataTable";
import KpiCard from "@/components/crm/KpiCard";
import { customerList } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <CrmSectionShell
      title="Customer List"
      subtitle="Customer 360"
      description="Segment, filter, and triage customers with lifecycle, tier, RFM, and outstanding visibility."
    >
      <section className="grid gap-4 lg:grid-cols-4">
        <KpiCard label="Active" value="9,412" delta="+1.2%" tone="positive" />
        <KpiCard label="At Risk" value="1,284" delta="+0.6%" tone="warning" />
        <KpiCard label="Outstanding" value="$42.2k" delta="-0.6%" />
        <KpiCard label="VIP" value="312" delta="+2.0%" tone="positive" />
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              Area / Zone
            </p>
            <select className="mt-2 w-full rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]">
              <option>All Areas</option>
              <option>Central</option>
              <option>North</option>
              <option>South</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              Lifecycle
            </p>
            <select className="mt-2 w-full rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]">
              <option>All</option>
              <option>New</option>
              <option>Active</option>
              <option>At-Risk</option>
              <option>Churned</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              Tier
            </p>
            <select className="mt-2 w-full rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]">
              <option>All</option>
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              Outstanding &gt; 0
            </p>
            <div className="mt-2 flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm text-[#4b4a47]">Only outstanding</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              RFM Bucket
            </p>
            <select className="mt-2 w-full rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]">
              <option>All</option>
              <option>High-High-High</option>
              <option>High-Mid-Mid</option>
              <option>Low-Low-Low</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              Last Order Range
            </p>
            <select className="mt-2 w-full rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]">
              <option>All time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>30-60 days</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              Tags
            </p>
            <select className="mt-2 w-full rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]">
              <option>All</option>
              <option>VIP</option>
              <option>High CLV</option>
              <option>Winback</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#2a2927]">
              Apply Filters
            </button>
            <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#2a2927]">
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#2a2927]">
          Add Tag
        </button>
        <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#2a2927]">
          Add Note/Task
        </button>
        <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#2a2927]">
          Export
        </button>
      </section>

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "area", label: "Area" },
          { key: "tier", label: "Tier" },
          { key: "points", label: "Points", align: "right" },
          { key: "lastOrder", label: "Last Order" },
          { key: "orders30d", label: "Orders (30d)", align: "right" },
          { key: "spend30d", label: "Spend (30d)", align: "right" },
          { key: "clv", label: "CLV", align: "right" },
          { key: "churn", label: "Churn Risk" },
          { key: "outstanding", label: "Outstanding", align: "right" },
        ]}
        data={customerList}
      />
    </CrmSectionShell>
  );
}
