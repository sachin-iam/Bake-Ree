import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsProcurementPage() {
  return (
    <OpsSectionShell
      title="Procurement"
      subtitle="ERP / Procurement"
      description="Manage vendors, purchase requests, POs, GRNs, and vendor bills in one chain."
      items={[
        { title: "Vendors", detail: "Profiles, pricing, and lead time tracking." },
        { title: "Purchase Orders", detail: "Approval workflow with line-level status." },
        { title: "GRN + Bills", detail: "Match goods received to vendor invoices." },
      ]}
      primaryAction={{ label: "Create PO", href: "/ops/erp/procurement" }}
      secondaryAction={{ label: "Add Vendor", href: "/ops/erp/procurement" }}
    />
  );
}
