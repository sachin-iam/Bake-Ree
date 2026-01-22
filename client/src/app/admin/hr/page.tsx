import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminHrPage() {
  return (
    <AdminSectionShell
      title="HR & Payroll"
      subtitle="Admin / HR"
      description="Manage employees, attendance, shifts, and payroll approvals."
      items={[
        { title: "Employees", detail: "Roles, compensation, and compliance." },
        { title: "Attendance", detail: "Daily check-ins and overtime." },
        { title: "Payroll", detail: "Run payroll and issue payslips." },
      ]}
      primaryAction={{ label: "Add Employee", href: "/admin/hr" }}
      secondaryAction={{ label: "Run Payroll", href: "/admin/hr" }}
    />
  );
}
