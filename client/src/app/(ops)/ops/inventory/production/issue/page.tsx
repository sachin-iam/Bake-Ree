import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { productionIssueRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Issues to Production"
      description="Raw material issues to work orders with batch traceability."
    >
      <OpsTable
        columns={[
          { key: "workOrder", label: "Work Order" },
          { key: "item", label: "Item" },
          { key: "qty", label: "Qty" },
          { key: "status", label: "Status" },
        ]}
        rows={productionIssueRows.map((row) => ({
          id: row.id,
          cells: {
            workOrder: row.workOrder,
            item: row.item,
            qty: row.qty,
            status: (
              <OpsBadge
                label={row.status}
                tone={row.status === "Issued" ? "success" : "warning"}
              />
            ),
          },
        }))}
      />
    </OpsSection>
  );
}
