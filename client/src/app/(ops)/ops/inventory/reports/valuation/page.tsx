import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { valuationRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Inventory Valuation"
      description="Valuation by warehouse, item, and costing method."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "warehouse", label: "Warehouse" },
          { key: "value", label: "Value" },
          { key: "method", label: "Method" },
        ]}
        rows={valuationRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            warehouse: row.warehouse,
            value: row.value,
            method: row.method,
          },
        }))}
      />
    </OpsSection>
  );
}
