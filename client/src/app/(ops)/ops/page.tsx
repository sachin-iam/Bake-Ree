import { opsHighlights } from "@/lib/ops/nav";
import OpsPageShell from "@/components/ops/OpsPageShell";

export default function OpsHomePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {opsHighlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <div
              key={highlight.label}
              className="rounded-2xl border border-[#efe5d8] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b4f2a]">
                  {highlight.label}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6f7ef] text-[#1f7a6b]">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[#2a2927]">{highlight.value}</p>
              <p className="mt-2 text-xs text-[#6b6b6b]">
                Live signals from Bake-Ree production, logistics, and CRM systems.
              </p>
            </div>
          );
        })}
      </section>
      <OpsPageShell
        showTable
        tableTitle="Ops readiness checklist"
        comingSoonTitle="Ops command center"
        comingSoonDescription="Surface operational KPIs, exception alerts, and escalation timelines here."
      />
    </div>
  );
}
