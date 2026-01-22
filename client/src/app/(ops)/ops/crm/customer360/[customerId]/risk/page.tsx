import KpiCard from "@/components/crm/KpiCard";

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Churn Risk" value="Medium" tone="warning" />
        <KpiCard label="Upsell Score" value="0.71" tone="positive" />
        <KpiCard label="Next Best Action" value="Tier upgrade push" />
      </section>
      <section className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-[#4b4a47] shadow-sm">
        Top drivers: lower frequency in past 30 days, skipped weekend orders, reduced
        basket size. Recommended action: winback offer + reminder 25-30 days after
        celebration purchase.
      </section>
    </div>
  );
}
