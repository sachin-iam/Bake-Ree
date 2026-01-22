import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { turnRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Stock Turns & Days on Hand"
      description="Turnover and days on hand by item."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "turns", label: "Turns" },
          { key: "daysOnHand", label: "Days on Hand" },
          { key: "velocity", label: "Velocity" },
        ]}
        rows={turnRows.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            turns: row.turns,
            daysOnHand: row.daysOnHand,
            velocity: row.velocity,
          },
        }))}
      />
    </OpsSection>
  );
}
