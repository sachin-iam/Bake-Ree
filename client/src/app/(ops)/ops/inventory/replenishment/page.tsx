import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { replenishmentLines } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Replenishment Planner"
      description="Suggested PR lines based on reorder points and velocity."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "suggestion", label: "Suggested Qty" },
          { key: "reason", label: "Reason" },
          { key: "vendor", label: "Preferred Vendor" },
        ]}
        rows={replenishmentLines.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            suggestion: row.suggestion,
            reason: row.reason,
            vendor: row.vendor,
          },
        }))}
      />
    </OpsSection>
  );
}
