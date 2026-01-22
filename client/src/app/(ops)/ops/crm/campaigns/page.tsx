import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsCampaignsPage() {
  return (
    <OpsSectionShell
      title="Campaigns"
      subtitle="CRM / Engagement"
      description="Launch targeted campaigns with offers, coupons, and automation triggers."
      items={[
        { title: "Campaign Builder", detail: "Segment targeting and scheduling." },
        { title: "Offers", detail: "Coupons, bundles, and incentives." },
        { title: "Performance", detail: "Open rate, redemption, revenue lift." },
      ]}
      primaryAction={{ label: "Create Campaign", href: "/ops/crm/campaigns" }}
      secondaryAction={{ label: "Manage Offers", href: "/ops/crm/campaigns" }}
    />
  );
}
