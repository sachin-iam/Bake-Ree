import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { wasteRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Waste & Spoilage Logs"
      description="Log wastage by batch with reason codes and cost impact."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "qty", label: "Qty" },
          { key: "cost", label: "Cost" },
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
