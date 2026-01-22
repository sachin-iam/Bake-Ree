import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsLogisticsPage() {
  return (
    <OpsSectionShell
      title="Logistics"
      subtitle="ERP / Logistics"
      description="Coordinate delivery queue, route plans, driver assignments, and SLA tracking."
      items={[
        { title: "Delivery Queue", detail: "Ready orders with routing priority." },
        { title: "Routes", detail: "Assign stops, ETAs, and driver capacity." },
        { title: "Zones", detail: "Coverage areas, pricing, and SLA rules." },
      ]}
      primaryAction={{ label: "Plan Route", href: "/ops/erp/logistics" }}
      secondaryAction={{ label: "Assign Driver", href: "/ops/erp/logistics" }}
    />
  );
}
