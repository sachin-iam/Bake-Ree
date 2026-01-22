import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { itemMasterRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Item Master"
      description="Ingredients, packaging, and finished goods master catalog."
    >
      <OpsTable
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Item" },
          { key: "type", label: "Type" },
          { key: "uom", label: "Base UoM" },
          { key: "reorder", label: "Reorder Qty" },
        ]}
        rows={itemMasterRows.map((row) => ({
          id: row.id,
          cells: {
            sku: row.sku,
            name: row.name,
            type: row.type,
            uom: row.uom,
            reorder: row.reorder,
          },
        }))}
      />
    </OpsSection>
  );
}
