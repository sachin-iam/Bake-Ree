import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Generate Payslips"
      actionHref="/ops/hr/payslips"
      secondaryActionLabel="Export"
      secondaryActionHref="/ops/hr/payslips"
      helperText="Distribute payslips and manage acknowledgment history."
      tableTitle="Payslips"
      columns={["Employee", "Period", "Net Pay", "Status", "Delivered"]}
      emptyState={{
        title: "No payslips yet",
        description: "Payslips will appear after a payroll run is approved.",
      }}
    />
  );
}
