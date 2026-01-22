import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <CrmSectionShell title="Manual Adjustments" subtitle="Loyalty & Rewards" description="Admin-only points adjustments with audit trails.">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Configured rules" value="--" />
        <KpiCard label="Active" value="--" />
        <KpiCard label="Last updated" value="--" />
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        Configure policies and governance for this loyalty component.
      </section>
    </CrmSectionShell>
  );
}
