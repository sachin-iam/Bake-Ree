import DataTable from "@/components/crm/DataTable";

const orders = [
  { id: "ORD-9921", date: "Jan 18", total: "$68", items: "Cake, Pastry" },
  { id: "ORD-9880", date: "Jan 12", total: "$42", items: "Coffee, Croissant" },
  { id: "ORD-9822", date: "Jan 05", total: "$58", items: "Cake, Cookies" },
];

export default function Page() {
  return (
    <DataTable
      columns={[
        { key: "id", label: "Order" },
        { key: "date", label: "Date" },
        { key: "items", label: "Items" },
        { key: "total", label: "Total", align: "right" },
      ]}
      data={orders}
    />
  );
}
