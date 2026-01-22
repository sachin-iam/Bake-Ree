import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { customerReturnRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Customer Returns"
      description="Customer returns with restock and disposal decisions."
    >
      <OpsTable
        columns={[
          { key: "order", label: "Order" },
          { key: "item", label: "Item" },
          { key: "qty", label: "Qty" },
          { key: "decision", label: "Decision" },
        ]}
        rows={customerReturnRows.map((row) => ({
          id: row.id,
          cells: {
            order: row.order,
            item: row.item,
            qty: row.qty,
            decision: row.decision,
          },
        }))}
      />
    </OpsSection>
  );
}
