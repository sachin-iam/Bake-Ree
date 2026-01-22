import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { expiryAlerts } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Expiry Alerts"
      description="Batches nearing expiry with recommended actions."
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "lot", label: "Lot" },
          { key: "exp", label: "Exp Date" },
          { key: "qty", label: "Qty" },
          { key: "action", label: "Action" },
        ]}
        denseToggle
        rows={expiryAlerts.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            lot: row.lot,
            exp: row.exp,
            qty: row.qty,
            action: row.action,
          },
        }))}
      />
    </OpsSection>
  );
}
