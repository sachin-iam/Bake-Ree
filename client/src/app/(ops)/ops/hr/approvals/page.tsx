import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Review Approvals"
      actionHref="/ops/hr/approvals"
      secondaryActionLabel="Approval Rules"
      secondaryActionHref="/ops/hr/approvals"
      helperText="Approve leave, payroll, and expense requests with audit trails."
      tableTitle="Pending approvals"
      columns={["Request", "Employee", "Type", "Submitted", "Status"]}
      emptyState={{
        title: "No approvals pending",
        description: "Approval requests will appear here when submitted.",
      }}
    />
  );
}
