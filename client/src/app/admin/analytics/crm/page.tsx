import AdminSectionShell from "../../components/AdminSectionShell";

export default function AdminSubPage() {
  return (
    <AdminSectionShell
      title="CRM Analytics"
      subtitle="Admin / Analytics"
      description="Tier distribution and churn risk."
      items={[]}
      primaryAction={{ label: "Configure", href: "/admin" }}
      secondaryAction={{ label: "Export", href: "/admin" }}
    />
  );
}
