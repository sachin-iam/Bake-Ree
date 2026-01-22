import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Generate Report"
      actionHref="/ops/hr/reports"
      secondaryActionLabel="Export"
      secondaryActionHref="/ops/hr/reports"
      helperText="Review HR KPIs, payroll summaries, and compliance metrics."
      tableTitle="HR reports"
      columns={["Report", "Period", "Owner", "Format", "Status"]}
      emptyState={{
        title: "No reports generated",
        description: "Generate a report to review HR and payroll performance.",
      }}
    />
  );
}
