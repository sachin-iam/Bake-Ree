import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { wasteRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Waste % and Cost Impact"
      description="Waste by item with cost impact and reasons."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "qty", label: "Qty" },
          { key: "cost", label: "Cost Impact" },
          { key: "reason", label: "Reason" },
        ]}
        rows={wasteRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            qty: row.qty,
            cost: row.cost,
            reason: row.reason,
          },
        }))}
      />
    </OpsSection>
  );
}
