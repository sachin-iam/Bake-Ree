import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Create Role"
      actionHref="/ops/hr/roles"
      secondaryActionLabel="Permissions Matrix"
      secondaryActionHref="/ops/hr/roles"
      helperText="Define roles, permission scopes, and approval levels for HR workflows."
      tableTitle="Roles & permissions"
      columns={["Role", "Modules", "Approvals", "Members", "Status"]}
      emptyState={{
        title: "No roles configured",
        description: "Create a role to start assigning access controls and approvals.",
      }}
    />
  );
}
