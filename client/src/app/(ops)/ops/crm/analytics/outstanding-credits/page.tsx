import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <CrmSectionShell
      title="Outstanding & Credits"
      subtitle="Analytics"
      description="Outstanding totals, aging buckets, and credits overview."
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Primary KPI" value="--" />
        <KpiCard label="Secondary KPI" value="--" />
        <KpiCard label="Trend" value="--" />
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        Charts and tables will populate once data pipelines are connected.
      </section>
    </CrmSectionShell>
  );
}
