import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { prRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Purchase Requests (PR)"
      description="Internal requests with approval status and reasons."
    >
      <OpsTable
        columns={[
          { key: "warehouse", label: "Warehouse" },
          { key: "lines", label: "Lines" },
          { key: "status", label: "Status" },
          { key: "reason", label: "Reason" },
        ]}
        rows={prRows.map((row) => ({
          id: row.id,
          cells: {
            warehouse: row.warehouse,
            lines: row.lines,
            status: (
              <OpsBadge
                label={row.status}
                tone={row.status === "Approved" ? "success" : "warning"}
              />
            ),
            reason: row.reason,
          },
        }))}
      />
    </OpsSection>
  );
}
