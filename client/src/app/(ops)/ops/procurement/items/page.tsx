import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { vendorItemRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Vendor Items & Price Lists"
      description="Vendor-specific SKUs with pricing and validity windows."
    >
      <OpsTable
        columns={[
          { key: "vendor", label: "Vendor" },
          { key: "item", label: "Item" },
          { key: "uom", label: "UoM" },
          { key: "price", label: "Price" },
          { key: "valid", label: "Valid Window" },
        ]}
        rows={vendorItemRows.map((row) => ({
          id: row.id,
          cells: {
            vendor: row.vendor,
            item: row.item,
            uom: row.uom,
            price: row.price,
            valid: row.valid,
          },
        }))}
      />
    </OpsSection>
  );
}
