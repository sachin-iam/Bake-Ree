import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { returnRows } from "@/lib/ops/inventoryMock";

export default function Page() {
  return (
    <OpsSection
      title="Returns to Vendor (RTV)"
      description="Return batches to vendors with credit tracking."
    >
      <OpsTable
        columns={[
          { key: "vendor", label: "Vendor" },
          { key: "item", label: "Item" },
          { key: "qty", label: "Qty" },
          { key: "status", label: "Status" },
        ]}
        rows={returnRows.map((row) => ({
          id: row.id,
          cells: {
            vendor: row.vendor,
            item: row.item,
            qty: row.qty,
            status: <OpsBadge label={row.status} tone="warning" />,
          },
        }))}
      />
    </OpsSection>
  );
}
