import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminFinancePage() {
  return (
    <AdminSectionShell
      title="Finance"
      subtitle="Admin / Finance"
      description="Oversee invoices, payments, refunds, and margin performance."
      items={[
        { title: "Invoices", detail: "Paid, pending, and overdue invoices." },
        { title: "Payments", detail: "Settlement tracking and reconciliations." },
        { title: "Taxes", detail: "Tax liabilities and filings." },
      ]}
      primaryAction={{ label: "Create Invoice", href: "/admin/finance" }}
      secondaryAction={{ label: "View P&L", href: "/admin/finance" }}
    />
  );
}
