import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { pricingRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Pricing & Cost History"
      description="Latest cost updates and variance by item."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "current", label: "Current Cost" },
          { key: "last", label: "Previous Cost" },
          { key: "variance", label: "Variance" },
        ]}
        rows={pricingRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            current: row.current,
            last: row.last,
            variance: row.variance,
          },
        }))}
      />
    </OpsSection>
  );
}
