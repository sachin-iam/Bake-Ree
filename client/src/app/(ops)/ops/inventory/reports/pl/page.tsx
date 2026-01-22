import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { plRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Inventory P&L Impact"
      description="Purchases, COGS, waste, and closing stock summary."
    >
      <OpsTable
        columns={[
          { key: "period", label: "Period" },
          { key: "purchases", label: "Purchases" },
          { key: "cogs", label: "COGS" },
          { key: "waste", label: "Waste" },
          { key: "closing", label: "Closing Stock" },
        ]}
        rows={plRows.map((row) => ({
          id: row.id,
          cells: {
            period: row.period,
            purchases: row.purchases,
            cogs: row.cogs,
            waste: row.waste,
            closing: row.closing,
          },
        }))}
      />
    </OpsSection>
  );
}
