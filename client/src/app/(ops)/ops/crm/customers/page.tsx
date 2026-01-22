import OpsPageContent from "@/components/ops/OpsPageContent";

export default function Page() {
  return (
    <OpsPageContent showTable emptyState={{ title: "No customers yet", description: "Customer profiles will appear once CRM data is available." }} />
  );
}
