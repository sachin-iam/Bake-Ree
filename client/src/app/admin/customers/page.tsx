import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminCustomersPage() {
  return (
    <AdminSectionShell
      title="Customers"
      subtitle="Admin / Customers"
      description="Customer list management with segmentation, activity, and loyalty visibility."
      items={[
        { title: "Customer List", detail: "Searchable profiles and contact data." },
        { title: "Segmentation", detail: "Tier and lifecycle filters." },
        { title: "Exports", detail: "CSV/XLSX customer reports." },
      ]}
      primaryAction={{ label: "Add Customer", href: "/admin/customers" }}
      secondaryAction={{ label: "Export", href: "/admin/customers" }}
    />
  );
}
