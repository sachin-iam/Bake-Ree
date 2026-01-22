import OpsPageContent from "@/components/ops/OpsPageContent";

export default function Page() {
  return (
    <OpsPageContent showTable emptyState={{ title: "No counter orders yet", description: "Counter tickets will show up here as POS data syncs." }} />
  );
}
