import AdminSectionShell from "../../components/AdminSectionShell";

export default function AdminSubPage() {
  return (
    <AdminSectionShell
      title="Availability"
      subtitle="Admin / Products"
      description="Channel visibility and active/inactive controls."
      items={[]}
      primaryAction={{ label: "Configure", href: "/admin" }}
      secondaryAction={{ label: "Export", href: "/admin" }}
    />
  );
}
