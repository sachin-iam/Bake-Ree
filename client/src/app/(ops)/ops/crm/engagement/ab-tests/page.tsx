import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <CrmSectionShell title="A/B Tests" subtitle="Engagement" description="Experiment setup, lift, and attribution.">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Active" value="--" />
        <KpiCard label="Draft" value="--" />
        <KpiCard label="Last sent" value="--" />
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        Channels (Email/SMS/WhatsApp/Push) will connect via providers.
      </section>
    </CrmSectionShell>
  );
}
