import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { billRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Vendor Bills / AP"
      description="Bills pending approval, dispute, or payment."
    >
      <OpsTable
        columns={[
          { key: "vendor", label: "Vendor" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "due", label: "Due Date" },
        ]}
        rows={billRows.map((row) => ({
          id: row.id,
          cells: {
            vendor: row.vendor,
            amount: row.amount,
            status: <OpsBadge label={row.status} tone="warning" />,
            due: row.due,
          },
        }))}
      />
    </OpsSection>
  );
}
