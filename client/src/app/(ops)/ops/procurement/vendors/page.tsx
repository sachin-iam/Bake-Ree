import OpsBadge from "@/components/ops/OpsBadge";
import OpsKpiGrid from "@/components/ops/OpsKpiGrid";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { procurementKpis, vendorRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <div className="space-y-6">
      <OpsKpiGrid items={procurementKpis} />
      <OpsSection
        title="Vendors"
        description="Approved vendors with lead times and payment terms."
      >
        <OpsTable
          columns={[
            { key: "name", label: "Vendor" },
            { key: "leadTime", label: "Lead Time" },
            { key: "rating", label: "Rating" },
            { key: "terms", label: "Terms" },
            { key: "status", label: "Status" },
          ]}
          rows={vendorRows.map((row) => ({
            id: row.id,
            cells: {
              name: row.name,
              leadTime: row.leadTime,
              rating: row.rating,
              terms: row.terms,
              status: <OpsBadge label={row.status} tone="success" />,
            },
          }))}
        />
      </OpsSection>
    </div>
  );
}
