import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { varianceRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Variance Report"
      description="Expected vs actual usage by item and recipe."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "expected", label: "Expected" },
          { key: "actual", label: "Actual" },
          { key: "variance", label: "Variance" },
        ]}
        rows={varianceRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            expected: row.expected,
            actual: row.actual,
            variance: row.variance,
          },
        }))}
      />
    </OpsSection>
  );
}
