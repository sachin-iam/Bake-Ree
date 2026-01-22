import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { productionOutputRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Production Output"
      description="Finished goods receipts with batch creation."
    >
      <OpsTable
        columns={[
          { key: "workOrder", label: "Work Order" },
          { key: "item", label: "Item" },
          { key: "batch", label: "Batch" },
          { key: "qty", label: "Qty" },
          { key: "status", label: "Status" },
        ]}
        rows={productionOutputRows.map((row) => ({
          id: row.id,
          cells: {
            workOrder: row.workOrder,
            item: row.item,
            batch: row.batch,
            qty: row.qty,
            status: <OpsBadge label={row.status} tone="success" />,
          },
        }))}
      />
    </OpsSection>
  );
}
