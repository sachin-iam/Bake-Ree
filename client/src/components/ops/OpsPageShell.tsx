import clsx from "clsx";

export type OpsEmptyState = {
  title: string;
  description: string;
};

type OpsPageShellProps = {
  showTable?: boolean;
  emptyState?: OpsEmptyState;
  tableTitle?: string;
  comingSoonTitle?: string;
  comingSoonDescription?: string;
};

export default function OpsPageShell({
  showTable = false,
  emptyState,
  tableTitle = "Table preview",
  comingSoonTitle = "Coming soon",
  comingSoonDescription =
    "This module is wired to the Ops navigation and will surface live data soon.",
}: OpsPageShellProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2a2927]">{comingSoonTitle}</h2>
        <p className="mt-2 text-sm text-[#6b6b6b]">{comingSoonDescription}</p>
      </section>

      {emptyState && (
        <section className="rounded-2xl border border-dashed border-[#efe5d8] bg-[#fbf7f1] p-6">
          <h3 className="text-sm font-semibold text-[#2a2927]">{emptyState.title}</h3>
          <p className="mt-1 text-sm text-[#6b6b6b]">{emptyState.description}</p>
        </section>
      )}

      {showTable && (
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#2a2927]">{tableTitle}</h3>
            <span className="text-xs text-[#8b867f]">Placeholder</span>
          </div>
          <div className="mt-4 grid gap-2">
            {["Row 1", "Row 2", "Row 3", "Row 4"].map((row) => (
              <div
                key={row}
                className={clsx(
                  "flex items-center justify-between rounded-xl border border-[#efe5d8] px-4 py-3 text-sm text-[#6b6b6b]",
                  "bg-[#fbf7f1]"
                )}
              >
                <span>{row}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8b867f]">
                  Data
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
