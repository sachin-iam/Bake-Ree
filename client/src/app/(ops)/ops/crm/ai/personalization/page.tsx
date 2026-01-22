import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <CrmSectionShell title="Personalization Studio" subtitle="AI & Insights" description="Ranking weights, guardrails, and constraints.">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Coverage" value="--" />
        <KpiCard label="Model" value="Rule-based" />
        <KpiCard label="Last refresh" value="--" />
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        AI scaffolding is ready. Plug in model outputs when available.
      </section>
    </CrmSectionShell>
  );
}
