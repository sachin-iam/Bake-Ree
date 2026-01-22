import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { slowMovingRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Slow Moving / Dead Stock"
      description="Items with low velocity and aging on-hand inventory."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "lastMove", label: "Last Move" },
          { key: "onHand", label: "On Hand" },
        ]}
        rows={slowMovingRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            lastMove: row.lastMove,
            onHand: row.onHand,
          },
        }))}
      />
    </OpsSection>
  );
}
