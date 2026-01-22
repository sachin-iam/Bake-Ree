import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { storageRuleRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Storage Rules"
      description="Temperature zones, shelf life, and handling requirements."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "tempZone", label: "Temp Zone" },
          { key: "shelfLife", label: "Shelf Life" },
          { key: "allergens", label: "Allergens" },
        ]}
        rows={storageRuleRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            tempZone: row.tempZone,
            shelfLife: row.shelfLife,
            allergens: row.allergens,
          },
        }))}
      />
    </OpsSection>
  );
}
