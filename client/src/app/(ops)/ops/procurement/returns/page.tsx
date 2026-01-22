import OpsBadge from "@/components/ops/OpsBadge";
import OpsSection from "@/components/ops/OpsSection";
import OpsTable from "@/components/ops/OpsTable";
import { purchaseReturnRows } from "@/lib/ops/procurementMock";

export default function Page() {
  return (
    <OpsSection
      title="Purchase Returns (RTV)"
      description="Returns to vendors with credit status."
    >
      <OpsTable
        columns={[
          { key: "vendor", label: "Vendor" },
          { key: "items", label: "Items" },
          { key: "value", label: "Value" },
          { key: "status", label: "Status" },
        ]}
        rows={purchaseReturnRows.map((row) => ({
          id: row.id,
          cells: {
            vendor: row.vendor,
            items: row.items,
            value: row.value,
            status: <OpsBadge label={row.status} tone="warning" />,
          },
        }))}
      />
    </OpsSection>
  );
}
