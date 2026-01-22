import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsSegmentsPage() {
  return (
    <OpsSectionShell
      title="Segments"
      subtitle="CRM / Segmentation"
      description="Build lifecycle, tier, and RFM segments to target engagement and offers."
      items={[
        { title: "Tier Distribution", detail: "Bronze to Platinum by period." },
        { title: "Lifecycle", detail: "New, active, at-risk, churned." },
        { title: "Saved Segments", detail: "Reusable filters for campaigns." },
      ]}
      primaryAction={{ label: "Create Segment", href: "/ops/crm/segments" }}
      secondaryAction={{ label: "View RFM", href: "/ops/crm/segments" }}
    />
  );
}
