import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { batchRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Batch / Expiry Tracking"
      description="Lot-level visibility across warehouses and temp zones."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "lot", label: "Lot" },
          { key: "exp", label: "Exp Date" },
          { key: "qty", label: "Qty" },
          { key: "warehouse", label: "Warehouse" },
          { key: "status", label: "Status" },
        ]}
        denseToggle
        rows={batchRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            lot: row.lot,
            exp: row.exp,
            qty: row.qty,
            warehouse: row.warehouse,
            status: (
              <OpsBadge
                label={row.status}
                tone={row.status === "Soon" ? "warning" : "success"}
              />
            ),
          },
        }))}
      />
    </OpsSection>
  );
}
