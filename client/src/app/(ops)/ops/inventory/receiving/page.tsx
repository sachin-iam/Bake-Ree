import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { receivingRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Receiving (GRN Intake)"
      description="Inbound receipts with QC and batch capture."
    >
      <OpsTable
        columns={[
          { key: "po", label: "PO" },
          { key: "vendor", label: "Vendor" },
          { key: "lines", label: "Lines" },
          { key: "qc", label: "QC Status" },
        ]}
        rows={receivingRows.map((row) => ({
          id: row.id,
          cells: {
            po: row.po,
            vendor: row.vendor,
            lines: row.lines,
            qc: (
              <OpsBadge
                label={row.qc}
                tone={row.qc === "Passed" ? "success" : row.qc === "Partial" ? "warning" : "danger"}
              />
            ),
          },
        }))}
      />
    </OpsSection>
  );
}
