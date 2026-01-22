import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { fefoAllocations } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="FEFO Allocation & Reservations"
      description="First-expired-first-out allocation with reservations and consumption status."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "request", label: "Request" },
          { key: "batch", label: "Batch" },
          { key: "exp", label: "Exp Date" },
          { key: "qty", label: "Qty" },
          { key: "status", label: "Status" },
        ]}
        rows={fefoAllocations.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            request: row.request,
            batch: row.batch,
            exp: row.exp,
            qty: row.qty,
            status: (
              <OpsBadge
                label={row.status}
                tone={row.status === "Reserved" ? "warning" : "success"}
              />
            ),
          },
        }))}
      />
    </OpsSection>
  );
}
