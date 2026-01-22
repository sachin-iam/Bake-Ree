import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminSettingsPage() {
  return (
    <AdminSectionShell
      title="Settings"
      subtitle="Admin / Settings"
      description="Configure access control, organization settings, and system integrations."
      items={[
        { title: "Roles & Permissions", detail: "Admin, finance, HR, and ops roles." },
        { title: "Locations", detail: "Stores, kitchens, and delivery zones." },
        { title: "Integrations", detail: "Payments, email, SMS, and webhooks." },
      ]}
      primaryAction={{ label: "Manage Roles", href: "/admin/settings" }}
      secondaryAction={{ label: "System Audit", href: "/admin/settings" }}
    />
  );
}
