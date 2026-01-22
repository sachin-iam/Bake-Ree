import OpsSectionShell from "../../components/OpsSectionShell";

export default function OpsHrPage() {
  return (
    <OpsSectionShell
      title="HR & Payroll"
      subtitle="ERP / HR"
      description="Manage employees, shifts, attendance, and payroll runs securely."
      items={[
        { title: "Employees", detail: "Role, pay type, and bank details." },
        { title: "Attendance", detail: "Daily check-ins and overtime rules." },
        { title: "Payroll", detail: "Run payroll, generate payslips." },
      ]}
      primaryAction={{ label: "Add Employee", href: "/ops/erp/hr" }}
      secondaryAction={{ label: "Run Payroll", href: "/ops/erp/hr" }}
    />
  );
}
