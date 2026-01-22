import OpsSectionShell from "../components/OpsSectionShell";

export default function OpsErpPage() {
  return (
    <OpsSectionShell
      title="ERP Overview"
      subtitle="Enterprise Resource Planning"
      description="Connect production, inventory management, logistics, finance, and HR into a single operational system."
      items={[
        { title: "Production", detail: "Plan recipes, batches, and work orders." },
        {
          title: "Inventory",
          detail: "Track stock, batches, expiries, and procurement workflows.",
        },
      ]}
      primaryAction={{ label: "Open Production", href: "/ops/erp/production" }}
      secondaryAction={{ label: "Open Inventory", href: "/ops/erp/inventory" }}
    />
  );
}
