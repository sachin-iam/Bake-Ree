import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Record Attendance"
      actionHref="/ops/hr/attendance"
      secondaryActionLabel="Sync Devices"
      secondaryActionHref="/ops/hr/attendance"
      helperText="Track daily check-ins, late arrivals, overtime, and timesheet exceptions."
      tableTitle="Attendance logs"
      columns={["Employee", "Date", "Check-in", "Check-out", "Status"]}
      emptyState={{
        title: "No attendance data",
        description: "Attendance logs will appear once staff start checking in.",
      }}
    />
  );
}
