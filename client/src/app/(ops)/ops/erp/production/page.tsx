import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsProductionPage() {
  return (
    <OpsSectionShell
      title="Production"
      subtitle="ERP / Production"
      description="Control recipes, batch planning, work orders, yield, and wastage for kitchen operations."
      items={[
        { title: "Recipes", detail: "Ingredient lists, yield targets, and costed BOMs." },
        { title: "Batch Planning", detail: "Daily/weekly plans linked to forecast demand." },
        { title: "Work Orders", detail: "Step-by-step tasks with completion tracking." },
      ]}
      primaryAction={{ label: "Create Batch Plan", href: "/ops/erp/production" }}
      secondaryAction={{ label: "Manage Recipes", href: "/ops/erp/production" }}
    />
  );
}
