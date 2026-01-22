import RecommendationPanel from "@/components/crm/RecommendationPanel";
import { customerRecommendations } from "@/lib/crm/mockData";

export default function Page() {
  return <RecommendationPanel items={customerRecommendations} />;
}
