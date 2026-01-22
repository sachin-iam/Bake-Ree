import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { adjustmentRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Cycle Counts & Audits"
      description="Latest cycle counts, approvals, and variance postings."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "batch", label: "Batch" },
          { key: "delta", label: "Variance" },
          { key: "reason", label: "Reason" },
          { key: "approvedBy", label: "Approved By" },
        ]}
        rows={adjustmentRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            batch: row.batch,
            delta: row.delta,
            reason: row.reason,
            approvedBy: row.approvedBy,
          },
        }))}
      />
    </OpsSection>
  );
}
