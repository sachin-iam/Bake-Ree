import KpiCard from "@/components/crm/KpiCard";
import PointsLedgerTable from "@/components/crm/PointsLedgerTable";
import StreakWidget from "@/components/crm/StreakWidget";
import { pointsLedger } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Tier" value="Gold" />
        <KpiCard label="Points Balance" value="2,840" />
        <KpiCard label="Next Tier" value="$48 to Platinum" />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <PointsLedgerTable rows={pointsLedger} />
        <StreakWidget current={6} best={10} nextMilestone={8} />
      </section>
    </div>
  );
}
