import OpsModuleShell from "@/components/ops/OpsModuleShell";

export default function Page() {
  return (
    <OpsModuleShell
      actionLabel="Upload Document"
      actionHref="/ops/hr/documents"
      secondaryActionLabel="Compliance Check"
      secondaryActionHref="/ops/hr/documents"
      helperText="Track contracts, IDs, certifications, and compliance expiries."
      tableTitle="HR documents"
      columns={["Employee", "Document", "Issued", "Expiry", "Status"]}
      emptyState={{
        title: "No documents uploaded",
        description: "Upload employee documents to maintain compliance records.",
      }}
    />
  );
}
