import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { rfqRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="RFQ / Quotes"
      description="Request for quote comparisons across vendors."
    >
      <OpsTable
        columns={[
          { key: "vendorCount", label: "Vendors" },
          { key: "items", label: "Items" },
          { key: "status", label: "Status" },
          { key: "due", label: "Due Date" },
        ]}
        rows={rfqRows.map((row) => ({
          id: row.id,
          cells: {
            vendorCount: row.vendorCount,
            items: row.items,
            status: <OpsBadge label={row.status} tone="warning" />,
            due: row.due,
          },
        }))}
      />
    </OpsSection>
  );
}
