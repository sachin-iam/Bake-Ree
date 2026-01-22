import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { categoryRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Categories & Units"
      description="UoM definitions and conversion sets for items."
    >
      <OpsTable
        columns={[
          { key: "category", label: "Category" },
          { key: "uom", label: "Base UoM" },
          { key: "conversions", label: "Conversions" },
        ]}
        rows={categoryRows.map((row) => ({
          id: row.id,
          cells: {
            category: row.category,
            uom: row.uom,
            conversions: row.conversions,
          },
        }))}
      />
    </OpsSection>
  );
}
