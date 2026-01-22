import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsFinancePage() {
  return (
    <OpsSectionShell
      title="Finance"
      subtitle="ERP / Finance"
      description="Track invoices, payments, tax, refunds, and margin by product or order."
      items={[
        { title: "Invoices", detail: "Auto-generated from paid orders." },
        { title: "Payments", detail: "Capture, reconcile, and monitor settlements." },
        { title: "Costing", detail: "COGS and gross margin visibility." },
      ]}
      primaryAction={{ label: "Create Invoice", href: "/ops/erp/finance" }}
      secondaryAction={{ label: "View P&L", href: "/ops/erp/finance" }}
    />
  );
}
