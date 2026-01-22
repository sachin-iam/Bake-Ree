import Link from "next/link";

type OpsModuleShellProps = {
  actionLabel: string;
  actionHref: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  helperText: string;
  tableTitle: string;
  columns: string[];
  emptyState: { title: string; description: string };
};

export default function OpsModuleShell({
  actionLabel,
  actionHref,
  secondaryActionLabel,
  secondaryActionHref,
  helperText,
  tableTitle,
  columns,
  emptyState,
}: OpsModuleShellProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6b6b6b]">{helperText}</p>
          <div className="flex items-center gap-2">
            {secondaryActionLabel && secondaryActionHref && (
              <Link
                href={secondaryActionHref}
                className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#2a2927] transition hover:bg-[#f7f5f0]"
              >
                {secondaryActionLabel}
              </Link>
            )}
            <Link
              href={actionHref}
              className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white"
            >
              {actionLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2a2927]">{tableTitle}</h3>
          <span className="text-xs text-[#8b867f]">Placeholder</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.2em] text-[#8b867f]">
                {columns.map((column) => (
                  <th key={column} className="border-b border-[#efe5d8] pb-3 pr-4 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="border-b border-[#f1ebe1] text-[#6b6b6b]">
                  {columns.map((column) => (
                    <td key={column} className="py-3 pr-4">
                      {column} {index + 1}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-[#efe5d8] bg-[#fbf7f1] p-5">
        <h3 className="text-sm font-semibold text-[#2a2927]">{emptyState.title}</h3>
        <p className="mt-1 text-sm text-[#6b6b6b]">{emptyState.description}</p>
      </section>
    </div>
  );
}
