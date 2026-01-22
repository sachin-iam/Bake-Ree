import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { threeWayMatchRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="3-Way Match"
      description="Match PO, GRN, and vendor bill for compliance."
    >
      <OpsTable
        columns={[
          { key: "po", label: "PO" },
          { key: "grn", label: "GRN" },
          { key: "bill", label: "Bill" },
          { key: "status", label: "Status" },
        ]}
        rows={threeWayMatchRows.map((row) => ({
          id: row.id,
          cells: {
            po: row.po,
            grn: row.grn,
            bill: row.bill,
            status: <OpsBadge label={row.status} tone="success" />,
          },
        }))}
      />
    </OpsSection>
  );
}
