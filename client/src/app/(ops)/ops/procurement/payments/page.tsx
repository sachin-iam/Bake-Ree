import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { paymentRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Vendor Payments"
      description="Payment batches with status and remittance tracking."
    >
      <OpsTable
        columns={[
          { key: "bill", label: "Bill" },
          { key: "method", label: "Method" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
        ]}
        rows={paymentRows.map((row) => ({
          id: row.id,
          cells: {
            bill: row.bill,
            method: row.method,
            amount: row.amount,
            status: <OpsBadge label={row.status} tone="warning" />,
          },
        }))}
      />
    </OpsSection>
  );
}
