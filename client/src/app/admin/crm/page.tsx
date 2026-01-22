import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminCrmPage() {
  return (
    <AdminSectionShell
      title="CRM"
      subtitle="Admin / CRM"
      description="Customer relationship management with lifecycle, segmentation, and engagement insights."
      items={[
        { title: "Customer Analytics", detail: "Customer-wise, area-wise, product-wise analytics." },
        { title: "Loyalty", detail: "Points, tiers, and redemption tracking." },
        { title: "Engagement", detail: "Campaigns and retention workflows." },
      ]}
      primaryAction={{ label: "Open CRM", href: "/admin/crm" }}
      secondaryAction={{ label: "View Insights", href: "/admin/crm" }}
    />
  );
}
