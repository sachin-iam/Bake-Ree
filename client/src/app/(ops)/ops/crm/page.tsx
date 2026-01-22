import Link from "next/link";
import CrmSectionShell from "@/components/crm/CrmSectionShell";

const quickLinks = [
  { label: "Customer List", href: "/ops/crm/customer360/list" },
  { label: "Overview Dashboard", href: "/ops/crm/analytics/overview" },
  { label: "Loyalty Dashboard", href: "/ops/crm/loyalty/dashboard" },
  { label: "Recommendations Engine", href: "/ops/crm/ai/recommendations" },
];

export default function Page() {
  return (
    <CrmSectionShell
      title="Customers (CRM)"
      subtitle="CRM"
      description="Industry-grade CRM + loyalty intelligence suite. Track customer 360 profiles, engagement, and AI-ready insights with a minimal, fast UI."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-black/10 bg-white p-5 text-sm font-semibold text-[#2a2927] shadow-sm transition hover:bg-[#f7f5f0]"
          >
            {link.label}
          </Link>
        ))}
      </section>
      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        CRM navigation, analytics, loyalty, and AI modules are wired. Data flows will
        hydrate from backend services.
      </section>
    </CrmSectionShell>
  );
}
