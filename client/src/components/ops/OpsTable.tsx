import { useId, type ReactNode } from "react";
import clsx from "clsx";

export type OpsTableColumn = {
  key: string;
  label: string;
  className?: string;
};

export type OpsTableRow = {
  id: string;
  cells: Record<string, ReactNode>;
};

type OpsTableProps = {
  columns: OpsTableColumn[];
  rows: OpsTableRow[];
  dense?: boolean;
  denseToggle?: boolean;
  denseLabel?: string;
  emptyLabel?: string;
};

export default function OpsTable({
  columns,
  rows,
  dense = true,
  denseToggle = false,
  denseLabel = "Dense mode",
  emptyLabel = "No records available yet.",
}: OpsTableProps) {
  const baseDense = denseToggle ? false : dense;
  const toggleId = useId();
  return (
    <div className="space-y-2">
      {denseToggle && (
        <>
          <input id={toggleId} type="checkbox" className="peer sr-only" defaultChecked={dense} />
          <label
            htmlFor={toggleId}
            className={clsx(
              "flex cursor-pointer items-center justify-end gap-2 text-xs text-[#7a6f63]",
              "peer-checked:[&_.toggle-track]:border-[#1f7a6b]/40",
              "peer-checked:[&_.toggle-track]:bg-[#e6f7ef]",
              "peer-checked:[&_.toggle-thumb]:translate-x-4",
              "peer-checked:[&_.toggle-thumb]:bg-[#1f7a6b]"
            )}
          >
            <span className="toggle-track h-5 w-9 rounded-full border border-black/10 bg-white p-0.5 transition">
              <span className="toggle-thumb block h-3.5 w-3.5 rounded-full bg-[#8b867f] transition" />
            </span>
            <span>{denseLabel}</span>
          </label>
        </>
      )}
      <div
        className={clsx(
          "overflow-x-auto",
          denseToggle && "peer-checked:[&_td]:py-2 peer-checked:[&_td]:text-xs"
        )}
      >
        <table
          className={clsx(
            "min-w-[720px] w-full border-collapse text-sm"
          )}
        >
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-[#8b867f]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    "border-b border-[#efe5d8] pb-2 pr-4 font-semibold",
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-sm text-[#6b6b6b]">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-[#f1ebe1] text-[#2a2927]">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        baseDense ? "py-2 text-xs" : "py-3 text-sm",
                        "pr-4 text-[#2a2927]"
                      )}
                    >
                      {row.cells[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
