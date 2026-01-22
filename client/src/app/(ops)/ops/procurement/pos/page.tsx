import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { poRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Purchase Orders (PO)"
      description="Approved purchase orders with delivery tracking."
    >
      <OpsTable
        columns={[
          { key: "vendor", label: "Vendor" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "expected", label: "Expected" },
        ]}
        rows={poRows.map((row) => ({
          id: row.id,
          cells: {
            vendor: row.vendor,
            amount: row.amount,
            status: (
              <OpsBadge
                label={row.status}
                tone={row.status === "Approved" ? "success" : "warning"}
              />
            ),
            expected: row.expected,
          },
        }))}
      />
    </OpsSection>
  );
}
