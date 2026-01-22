import OpsActionButton from "@/components/ops/OpsActionButton";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { lowStockAlerts } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Low Stock Alerts"
      description="Items below reorder point with suggested reorder quantities."
      action={<OpsActionButton label="Generate PR" href="/ops/procurement/requests" />}
    >
      <OpsTable
        columns={[
          { key: "item", label: "Item" },
          { key: "available", label: "Available" },
          { key: "daily", label: "Daily Usage" },
          { key: "cover", label: "Days Cover" },
          { key: "reorder", label: "Reorder Qty" },
        ]}
        denseToggle
        rows={lowStockAlerts.map((row) => ({
          id: row.id,
          cells: {
            item: row.item,
            available: row.available,
            daily: row.daily,
            cover: row.cover,
            reorder: row.reorder,
          },
        }))}
      />
    </OpsSection>
  );
}
