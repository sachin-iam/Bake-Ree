import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminErpPage() {
  return (
    <AdminSectionShell
      title="ERP"
      subtitle="Admin / ERP"
      description="Employee resource management, internal operations, and workflow control."
      items={[
        { title: "Employees", detail: "Staff directory, roles, and permissions." },
        { title: "Operations", detail: "Internal workflows and task tracking." },
        { title: "Compliance", detail: "Policies, approvals, and audits." },
      ]}
      primaryAction={{ label: "Open ERP", href: "/admin/erp" }}
      secondaryAction={{ label: "Manage Roles", href: "/admin/erp" }}
    />
  );
}
