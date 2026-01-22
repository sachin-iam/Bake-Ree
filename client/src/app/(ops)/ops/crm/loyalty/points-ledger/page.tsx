import CrmSectionShell from "@/components/crm/CrmSectionShell";
import PointsLedgerTable from "@/components/crm/PointsLedgerTable";
import { pointsLedger } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <CrmSectionShell
      title="Points Ledger"
      subtitle="Loyalty & Rewards"
      description="Ledger of earn, redeem, expire, and adjustment events."
    >
      <PointsLedgerTable rows={pointsLedger} />
    </CrmSectionShell>
  );
}
