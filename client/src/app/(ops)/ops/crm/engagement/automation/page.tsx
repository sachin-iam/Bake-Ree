import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <CrmSectionShell title="Automation Rules" subtitle="Engagement" description="Trigger-based journeys and cooldowns.">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Active" value="--" />
        <KpiCard label="Draft" value="--" />
        <KpiCard label="Last sent" value="--" />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#2a2927]">Triggers</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#4b4a47]">
            <li>Inactive for X days</li>
            <li>Points expiring in X days</li>
            <li>Streak milestone reached</li>
            <li>Tier upgrade achieved</li>
            <li>High outstanding detected</li>
            <li>Birthday / Anniversary (placeholder)</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#2a2927]">Actions</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#4b4a47]">
            <li>Send offer / coupon</li>
            <li>Create staff follow-up task</li>
            <li>Add tag or move lifecycle stage</li>
            <li>Create winback campaign entry</li>
          </ul>
        </div>
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        Channels (Email/SMS/WhatsApp/Push) will connect via providers.
      </section>
    </CrmSectionShell>
  );
}
