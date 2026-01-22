import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="New Leave Request"
      actionHref="/ops/hr/leave"
      secondaryActionLabel="Leave Policy"
      secondaryActionHref="/ops/hr/leave"
      helperText="Manage leave requests, balances, and accrual rules across teams."
      tableTitle="Leave requests"
      columns={["Employee", "Type", "Dates", "Balance", "Status"]}
      emptyState={{
        title: "No leave requests",
        description: "Leave applications will appear here for review and approval.",
      }}
    />
  );
}
