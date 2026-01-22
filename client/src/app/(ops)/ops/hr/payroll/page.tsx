import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Create Payroll Run"
      actionHref="/ops/hr/payroll"
      secondaryActionLabel="Payroll Settings"
      secondaryActionHref="/ops/hr/payroll"
      helperText="Run payroll cycles, approvals, and lock periods for audit." 
      tableTitle="Payroll runs"
      columns={["Period", "Employees", "Gross", "Deductions", "Status"]}
      emptyState={{
        title: "No payroll runs",
        description: "Create a payroll run to calculate salaries and allowances.",
      }}
    />
  );
}
