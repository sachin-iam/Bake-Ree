import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsInsightsPage() {
  return (
    <OpsSectionShell
      title="Insights"
      subtitle="CRM / Analytics"
      description="Track CLV, churn risk, and product affinity across cohorts and tiers."
      items={[
        { title: "CLV", detail: "Customer lifetime value by segment." },
        { title: "Churn Risk", detail: "At-risk scoring and recovery list." },
        { title: "Affinity", detail: "Products frequently bought together." },
      ]}
      primaryAction={{ label: "View CLV", href: "/ops/crm/insights" }}
      secondaryAction={{ label: "Cohorts", href: "/ops/crm/insights" }}
    />
  );
}
