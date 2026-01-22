import AdminSectionShell from "../../components/AdminSectionShell";

export default function AdminSubPage() {
  return (
    <AdminSectionShell
      title="Order Reports"
      subtitle="Admin / Orders"
      description="Exports, summaries, and operational snapshots."
      items={[]}
      primaryAction={{ label: "Configure", href: "/admin" }}
      secondaryAction={{ label: "Export", href: "/admin" }}
    />
  );
}
