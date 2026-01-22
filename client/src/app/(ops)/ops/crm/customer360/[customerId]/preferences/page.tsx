import InsightPills from "@/components/crm/InsightPills";

export default function Page() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <InsightPills label="Dietary" items={["Low sugar", "Eggless"]} />
      <InsightPills label="Allergens" items={["Nuts", "Dairy"]} />
      <InsightPills label="Preferred delivery" items={["7-9 AM", "Weekend"]} />
      <InsightPills label="Communication" items={["WhatsApp", "Email"]} />
    </div>
  );
}
