import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { recipeRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Recipes / BOM Links"
      description="Recipe versions mapped to ingredient consumption."
    >
      <OpsTable
        columns={[
          { key: "recipe", label: "Recipe" },
          { key: "bomVersion", label: "BOM Version" },
          { key: "yield", label: "Yield" },
          { key: "status", label: "Status" },
        ]}
        rows={recipeRows.map((row) => ({
          id: row.id,
          cells: {
            recipe: row.recipe,
            bomVersion: row.bomVersion,
            yield: row.yield,
            status: <OpsBadge label={row.status} tone="success" />,
          },
        }))}
      />
    </OpsSection>
  );
}
