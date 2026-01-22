import { inventorySeed } from "./inventory-data";

const summaryCards = [
  {
    label: "Total SKUs",
    value: inventorySeed.length,
    tone: "text-[#2a2927]",
  },
  {
    label: "Low Stock",
    value: inventorySeed.filter((item) => item.status === "low").length,
    tone: "text-amber-600",
  },
  {
    label: "Critical",
    value: inventorySeed.filter((item) => item.status === "critical").length,
    tone: "text-rose-600",
  },
  {
    label: "Expired",
    value: inventorySeed.filter((item) => item.status === "expired").length,
    tone: "text-[#5c5a56]",
  },
];

export default function InventorySummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            {card.label}
          </p>
          <p className={`mt-2 text-3xl font-semibold ${card.tone}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
