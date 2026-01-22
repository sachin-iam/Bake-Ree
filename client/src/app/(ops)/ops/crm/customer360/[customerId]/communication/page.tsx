import DataTable from "@/components/crm/DataTable";
import { commsHistory } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <DataTable
      columns={[
        { key: "date", label: "Date" },
        { key: "channel", label: "Channel" },
        { key: "campaign", label: "Campaign" },
        { key: "status", label: "Status" },
      ]}
      data={commsHistory}
    />
  );
}
