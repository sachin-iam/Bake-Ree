import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { supplierMapRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Suppliers Mapping"
      description="Preferred vendor mapping with lead times."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "vendor", label: "Vendor" },
          { key: "leadTime", label: "Lead Time" },
          { key: "preferred", label: "Preferred" },
        ]}
        rows={supplierMapRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            vendor: row.vendor,
            leadTime: row.leadTime,
            preferred: row.preferred,
          },
        }))}
      />
    </OpsSection>
  );
}
