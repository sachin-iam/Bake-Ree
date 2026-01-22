import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminAnalyticsPage() {
  return (
    <AdminSectionShell
      title="Analytics"
      subtitle="Admin / Analytics"
      description="Cross-functional dashboards for sales, ops, inventory, and customer health."
      items={[
        { title: "Sales", detail: "Revenue, AOV, and repeat rate." },
        { title: "Operations", detail: "SLA compliance and production yield." },
        { title: "CRM", detail: "Tier distribution and churn risk." },
      ]}
      primaryAction={{ label: "Create Report", href: "/admin/analytics" }}
      secondaryAction={{ label: "Export", href: "/admin/analytics" }}
    />
  );
}
