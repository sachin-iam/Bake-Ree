import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { approvalRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Approvals Workflow"
      description="Approval routing for PRs, POs, and adjustments."
    >
      <OpsTable
        columns={[
          { key: "request", label: "Request" },
          { key: "step", label: "Step" },
          { key: "owner", label: "Owner" },
          { key: "status", label: "Status" },
        ]}
        rows={approvalRows.map((row) => ({
          id: row.id,
          cells: {
            request: row.request,
            step: row.step,
            owner: row.owner,
            status: <OpsBadge label={row.status} tone="warning" />,
          },
        }))}
      />
    </OpsSection>
  );
}
