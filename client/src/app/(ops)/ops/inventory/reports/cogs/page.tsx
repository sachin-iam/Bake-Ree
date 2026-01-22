import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { cogsRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection title="COGS Summary" description="Period-based COGS and waste impact.">
      <OpsTable
        columns={[
          { key: "period", label: "Period" },
          { key: "cogs", label: "COGS" },
          { key: "waste", label: "Waste" },
          { key: "variance", label: "Variance" },
        ]}
        rows={cogsRows.map((row) => ({
          id: row.id,
          cells: {
            period: row.period,
            cogs: row.cogs,
            waste: row.waste,
            variance: row.variance,
          },
        }))}
      />
    </OpsSection>
  );
}
