import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminInventoryPage() {
  return (
    <AdminSectionShell
      title="Inventory"
      subtitle="Admin / Inventory"
      description="High-level inventory visibility for stock health, expiries, and adjustments."
      items={[
        { title: "Stock Health", detail: "Low and critical stock monitoring." },
        { title: "Expiry", detail: "Perishable batches and ageing alerts." },
        { title: "Movements", detail: "Ledger-level adjustments and transfers." },
      ]}
      primaryAction={{ label: "New Adjustment", href: "/admin/inventory" }}
      secondaryAction={{ label: "View Ledger", href: "/admin/inventory" }}
    />
  );
}
