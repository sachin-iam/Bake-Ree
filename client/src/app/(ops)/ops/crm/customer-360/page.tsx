import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsCustomer360Page() {
  return (
    <OpsSectionShell
      title="Customer 360"
      subtitle="CRM / Customer"
      description="Unified customer profile with spend analytics, orders, loyalty ledger, and support notes."
      items={[
        { title: "Profile", detail: "Identity, contact channels, and preferences." },
        { title: "Timeline", detail: "Orders, refunds, loyalty, and touchpoints." },
        { title: "Insights", detail: "Spend trends, tier, and churn risk." },
      ]}
      primaryAction={{ label: "Add Customer Note", href: "/ops/crm/customer-360" }}
      secondaryAction={{ label: "Import Customers", href: "/ops/crm/customer-360" }}
    />
  );
}
