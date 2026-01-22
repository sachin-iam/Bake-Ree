import CrmSectionShell from "@/components/crm/CrmSectionShell";
import KpiCard from "@/components/crm/KpiCard";

const tiers = [
  { tier: "Bronze", spend: "$0", visits: "1+" },
  { tier: "Silver", spend: "$250", visits: "4" },
  { tier: "Gold", spend: "$600", visits: "8" },
  { tier: "Platinum", spend: "$1,200", visits: "14" },
];

export default function Page() {
  return (
    <CrmSectionShell
      title="Tier Engine"
      subtitle="Loyalty & Rewards"
      description="Rolling 90-day spend + frequency upgrades with tier benefits."
    >
      <section className="grid gap-4 lg:grid-cols-4">
        {tiers.map((tier) => (
          <KpiCard
            key={tier.tier}
            label={tier.tier}
            value={`${tier.spend} / ${tier.visits} visits`}
          />
        ))}
      </section>
    </CrmSectionShell>
  );
}
