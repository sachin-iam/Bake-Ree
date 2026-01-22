import KpiCard from "@/components/crm/KpiCard";
import InsightPills from "@/components/crm/InsightPills";

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="CLV" value="$4,820" />
        <KpiCard label="RFM" value="H-H-M" />
        <KpiCard label="Churn Score" value="0.38" tone="warning" />
      </section>
      <InsightPills label="Affinity" items={["Coffee", "Celebration cakes", "Pastries"]} />
      <section className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-[#4b4a47] shadow-sm">
        Drivers: high frequency in mornings, strong weekend cake purchases, low discount
        dependence. Suggested focus: premium bundles + early access.
      </section>
    </div>
  );
}
