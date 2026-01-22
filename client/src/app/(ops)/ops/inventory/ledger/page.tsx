import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { ledgerRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Stock Ledger"
      description="Append-only ledger of stock movements with cost impact and references."
    >
      <OpsTable
        columns={[
          { key: "ts", label: "Timestamp" },
          { key: "item", label: "Item" },
          { key: "type", label: "Type" },
          { key: "qty", label: "Qty" },
          { key: "warehouse", label: "Warehouse" },
          { key: "ref", label: "Ref" },
          { key: "cost", label: "Cost" },
        ]}
        denseToggle
        rows={ledgerRows.map((row) => ({
          id: row.id,
          cells: {
            ts: row.ts,
            item: row.item,
            type: (
              <OpsBadge
                label={row.type}
                tone={row.type === "IN" ? "success" : row.type === "WASTE" ? "danger" : "warning"}
              />
            ),
            qty: row.qty,
            warehouse: row.warehouse,
            ref: row.ref,
            cost: row.cost,
          },
        }))}
      />
    </OpsSection>
  );
}
