import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { grnRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="GRN (Goods Received)"
      description="Goods received notes with QC status and variances."
    >
      <OpsTable
        columns={[
          { key: "vendor", label: "Vendor" },
          { key: "po", label: "PO" },
          { key: "qc", label: "QC" },
          { key: "variance", label: "Variance" },
        ]}
        rows={grnRows.map((row) => ({
          id: row.id,
          cells: {
            vendor: row.vendor,
            po: row.po,
            qc: <OpsBadge label={row.qc} tone="success" />,
            variance: row.variance,
          },
        }))}
      />
    </OpsSection>
  );
}
