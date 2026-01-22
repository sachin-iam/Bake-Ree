import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Add Employee"
      actionHref="/ops/hr/employees"
      secondaryActionLabel="Run Payroll"
      secondaryActionHref="/ops/hr/payroll"
      helperText="Manage employees, compliance, attendance, and payroll cycles in one place."
      tableTitle="HR overview"
      columns={["Employee", "Role", "Status", "Location", "Payroll"]}
      emptyState={{
        title: "No HR activity yet",
        description: "Create your first employee profile to start tracking attendance and payroll.",
      }}
    />
  );
}
