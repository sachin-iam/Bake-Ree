import DataTable from "@/components/crm/DataTable";
import InsightPills from "@/components/crm/InsightPills";

const addresses = [
  { label: "Home", line: "24 Green Park, Central" },
  { label: "Office", line: "91 Tech Lane, North" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <InsightPills label="Area insights" items={["Central: 4.2 AOV", "High repeat", "Low churn"]} />
      <DataTable
        columns={[
          { key: "label", label: "Label" },
          { key: "line", label: "Address" },
        ]}
        data={addresses}
      />
    </div>
  );
}
