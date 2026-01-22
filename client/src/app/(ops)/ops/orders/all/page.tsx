import OpsPageContent from "@/components/ops/OpsPageContent";

export default function Page() {
  return (
    <OpsPageContent showTable emptyState={{ title: "No orders yet", description: "Historical and live orders will populate this ledger once data flows in." }} />
  );
}
