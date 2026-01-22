import DataTable from "@/components/crm/DataTable";

type PointsRow = {
  date: string;
  type: string;
  points: string;
  balance: string;
  ref: string;
};

type PointsLedgerTableProps = {
  rows: PointsRow[];
};

export default function PointsLedgerTable({ rows }: PointsLedgerTableProps) {
  return (
    <DataTable
      columns={[
        { key: "date", label: "Date" },
        { key: "type", label: "Type" },
        { key: "points", label: "Points", align: "right" },
        { key: "balance", label: "Balance", align: "right" },
        { key: "ref", label: "Ref" },
      ]}
      data={rows}
    />
  );
}
