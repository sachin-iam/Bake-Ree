import OpsPageContent from "@/components/ops/OpsPageContent";

export default function Page() {
  return (
    <OpsPageContent showTable emptyState={{ title: "No orders yet", description: "Customer order history will populate after the first purchase." }} />
  );
}
