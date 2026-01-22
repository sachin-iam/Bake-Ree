import CrmSectionShell from "@/components/crm/CrmSectionShell";
import RecommendationPanel from "@/components/crm/RecommendationPanel";
import { customerRecommendations } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <CrmSectionShell
      title="Recommendations Engine"
      subtitle="AI & Insights"
      description="Rule-based baseline now with a pluggable AI model later. Feedback captures accept/reject signals."
    >
      <RecommendationPanel items={customerRecommendations} />
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        AI layer interface: getRecommendations(customerId, context) → productId, reason,
        confidence. Results stored in CustomerInsight.recommendations.
      </section>
    </CrmSectionShell>
  );
}
