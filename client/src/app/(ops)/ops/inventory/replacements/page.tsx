import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { replacementRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Replacement / Substitution Records"
      description="Track substitutions and cost variance impacts."
    >
      <OpsTable
        columns={[
          { key: "original", label: "Original Item" },
          { key: "substitute", label: "Substitute" },
          { key: "reason", label: "Reason" },
          { key: "impact", label: "Cost Impact" },
        ]}
        rows={replacementRows.map((row) => ({
          id: row.id,
          cells: {
            original: row.original,
            substitute: row.substitute,
            reason: row.reason,
            impact: row.impact,
          },
        }))}
      />
    </OpsSection>
  );
}
