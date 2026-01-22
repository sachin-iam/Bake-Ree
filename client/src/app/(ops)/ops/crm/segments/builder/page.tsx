import CrmSectionShell from "@/components/crm/CrmSectionShell";
import SegmentBuilder from "@/components/crm/SegmentBuilder";

export default function Page() {
  return (
    <CrmSectionShell
      title="Custom Segment Builder"
      subtitle="Segments"
      description="Build rules-based segments using lifecycle, RFM, tier, and behavioral signals."
      primaryAction={{ label: "Save Segment", href: "/ops/crm/segments/builder" }}
    >
      <SegmentBuilder
        rules={[
          { field: "Last order", operator: "within", value: "30 days" },
          { field: "Tier", operator: "equals", value: "Gold" },
          { field: "Outstanding", operator: ">", value: "$0" },
        ]}
      />
    </CrmSectionShell>
  );
}
