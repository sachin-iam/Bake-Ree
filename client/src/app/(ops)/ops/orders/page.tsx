import OpsPageContent from "@/components/ops/OpsPageContent";

export default function Page() {
  return (
    <OpsPageContent showTable emptyState={{ title: "No orders yet", description: "Incoming orders will appear here with SLA status and fulfillment progress." }} />
  );
}
