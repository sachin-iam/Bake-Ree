import AdminSectionShell from "../../components/AdminSectionShell";

export default function AdminSubPage() {
  return (
    <AdminSectionShell
      title="Invoices"
      subtitle="Admin / Finance"
      description="Invoice list, status, and reconciliation."
      items={[]}
      primaryAction={{ label: "Configure", href: "/admin" }}
      secondaryAction={{ label: "Export", href: "/admin" }}
    />
  );
}
