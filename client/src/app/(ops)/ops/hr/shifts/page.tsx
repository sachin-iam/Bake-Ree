import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Create Shift"
      actionHref="/ops/hr/shifts"
      secondaryActionLabel="Publish Roster"
      secondaryActionHref="/ops/hr/shifts"
      helperText="Plan shifts, ensure coverage, and publish rosters across stores."
      tableTitle="Shift roster"
      columns={["Shift", "Employee", "Role", "Start", "End"]}
      emptyState={{
        title: "No shifts scheduled",
        description: "Create shifts to plan staffing and coverage for upcoming days.",
      }}
    />
  );
}
