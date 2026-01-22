import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";
import StreakWidget from "@/components/crm/StreakWidget";

export default function Page() {
  return (
    <CrmSectionShell
      title="Loyalty Dashboard"
      subtitle="Loyalty & Rewards"
      description="Monitor points liability, earn/redeem velocity, and tier progression."
    >
      <section className="grid gap-4 lg:grid-cols-4">
        <KpiCard label="Points Issued" value="1.8M" />
        <KpiCard label="Points Redeemed" value="620k" />
        <KpiCard label="Points Expiring (30d)" value="84k" tone="warning" />
        <KpiCard label="Liability" value="$9.8k" />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <StreakWidget current={4} best={12} nextMilestone={8} />
        <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-[#4b4a47] shadow-sm">
          Tier upgrade rules are enforced on rolling 90-day spend and frequency. Benefits
          include discounts, free delivery, and early access to launches.
        </div>
      </section>
    </CrmSectionShell>
  );
}
