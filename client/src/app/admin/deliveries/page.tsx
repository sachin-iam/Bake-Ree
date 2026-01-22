import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminDeliveriesPage() {
  return (
    <AdminSectionShell
      title="Deliveries"
      subtitle="Admin / Logistics"
      description="Assign drivers, manage routes, and track delivery SLAs."
      items={[
        { title: "Delivery Queue", detail: "Ready orders awaiting dispatch." },
        { title: "Driver Assignment", detail: "Assign deliveries and monitor progress." },
        { title: "Zones", detail: "Coverage rules and delivery fees." },
      ]}
      primaryAction={{ label: "Assign Driver", href: "/admin/deliveries" }}
      secondaryAction={{ label: "View Routes", href: "/admin/deliveries" }}
    />
  );
}
