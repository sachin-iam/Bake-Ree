type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "right";
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  compact?: boolean;
};

export default function DataTable<T extends Record<string, string | number>>({
  columns,
  data,
  compact = true,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-[#f7f5f0]">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f] ${
                  column.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-[#fbf9f4]"}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`px-4 ${compact ? "py-3" : "py-4"} text-sm text-[#2a2927] ${
                    column.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
