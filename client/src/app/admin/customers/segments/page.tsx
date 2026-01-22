import AdminSectionShell from "../../components/AdminSectionShell";

export default function AdminSubPage() {
  return (
    <AdminSectionShell
      title="Segments"
      subtitle="Admin / Customers"
      description="Tier and lifecycle segmentation."
      items={[]}
      primaryAction={{ label: "Configure", href: "/admin" }}
      secondaryAction={{ label: "Export", href: "/admin" }}
    />
  );
}
