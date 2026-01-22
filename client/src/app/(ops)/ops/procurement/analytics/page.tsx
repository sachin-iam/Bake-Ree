import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { analyticsRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Procurement Analytics"
      description="Lead times, fill rate, and price variance metrics."
    >
      <OpsTable
        columns={[
          { key: "metric", label: "Metric" },
          { key: "value", label: "Value" },
          { key: "trend", label: "Trend" },
        ]}
        rows={analyticsRows.map((row) => ({
          id: row.id,
          cells: {
            metric: row.metric,
            value: row.value,
            trend: row.trend,
          },
        }))}
      />
    </OpsSection>
  );
}
