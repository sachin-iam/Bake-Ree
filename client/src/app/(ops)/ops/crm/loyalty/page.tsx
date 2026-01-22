import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsCrmLoyaltyPage() {
  return (
    <OpsSectionShell
      title="Loyalty"
      subtitle="CRM / Loyalty"
      description="Configure earning rules, track points, and manage redemptions with full audit trails."
      items={[
        { title: "Rules Engine", detail: "Earn and redeem rules by tier." },
        { title: "Ledger", detail: "Every point credit and debit." },
        { title: "Expiry", detail: "Automatic expiration and alerts." },
      ]}
      primaryAction={{ label: "Edit Rules", href: "/ops/crm/loyalty" }}
      secondaryAction={{ label: "View Redemptions", href: "/ops/crm/loyalty" }}
    />
  );
}
