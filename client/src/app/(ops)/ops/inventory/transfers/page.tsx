import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { transferRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Transfers"
      description="Inter-warehouse and inter-store transfers with in-transit tracking."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "qty", label: "Qty" },
          { key: "from", label: "From" },
          { key: "to", label: "To" },
          { key: "status", label: "Status" },
        ]}
        rows={transferRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            qty: row.qty,
            from: row.from,
            to: row.to,
            status: (
              <OpsBadge
                label={row.status}
                tone={row.status === "Received" ? "success" : "warning"}
              />
            ),
          },
        }))}
      />
    </OpsSection>
  );
}
