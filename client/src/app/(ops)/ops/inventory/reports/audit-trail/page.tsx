import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { auditTrailRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Audit Trail Export"
      description="Audit-grade ledger trail with user actions."
    >
      <OpsTable
        columns={[
          { key: "entry", label: "Ledger Entry" },
          { key: "user", label: "User" },
          { key: "action", label: "Action" },
          { key: "ts", label: "Timestamp" },
        ]}
        rows={auditTrailRows.map((row) => ({
          id: row.id,
          cells: {
            entry: row.entry,
            user: row.user,
            action: row.action,
            ts: row.ts,
          },
        }))}
      />
    </OpsSection>
  );
}
