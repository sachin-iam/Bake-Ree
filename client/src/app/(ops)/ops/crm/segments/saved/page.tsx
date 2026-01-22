import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <CrmSectionShell title="Saved Segments" subtitle="Segments" description="Reusable segments for targeting and exports.">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Segment Size" value="--" />
        <KpiCard label="Avg CLV" value="--" />
        <KpiCard label="Repeat Rate" value="--" />
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        Segment filters and exports will appear here.
      </section>
    </CrmSectionShell>
  );
}
