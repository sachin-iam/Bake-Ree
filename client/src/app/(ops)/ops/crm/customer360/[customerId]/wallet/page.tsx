import KpiCard from "@/components/crm/KpiCard";
import DataTable from "@/components/crm/DataTable";
import { walletLedger } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Credits" value="$140" />
        <KpiCard label="Outstanding" value="$126" tone="warning" />
        <KpiCard label="Last Payment" value="8 days ago" />
      </section>

      <DataTable
        columns={[
          { key: "date", label: "Date" },
          { key: "type", label: "Type" },
          { key: "amount", label: "Amount", align: "right" },
          { key: "reason", label: "Reason" },
          { key: "ref", label: "Ref" },
        ]}
        data={walletLedger}
      />
    </div>
  );
}
