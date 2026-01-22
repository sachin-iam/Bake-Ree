import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Start Review Cycle"
      actionHref="/ops/hr/performance"
      secondaryActionLabel="Add KPI"
      secondaryActionHref="/ops/hr/performance"
      helperText="Track performance reviews, KPIs, and improvement plans by role."
      tableTitle="Performance reviews"
      columns={["Employee", "Cycle", "Rating", "Manager", "Status"]}
      emptyState={{
        title: "No reviews scheduled",
        description: "Create a review cycle to capture performance feedback.",
      }}
    />
  );
}
