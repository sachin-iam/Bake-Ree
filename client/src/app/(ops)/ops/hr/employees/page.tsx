import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Add Employee"
      actionHref="/ops/hr/employees"
      secondaryActionLabel="Import CSV"
      secondaryActionHref="/ops/hr/employees"
      helperText="Maintain the employee master record with roles, compensation, and compliance status."
      tableTitle="Employee directory"
      columns={["Employee", "Role", "Status", "Store", "Compensation"]}
      emptyState={{
        title: "No employees added",
        description: "Create an employee profile to start tracking attendance and payroll.",
      }}
    />
  );
}
