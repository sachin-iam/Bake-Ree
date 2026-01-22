import { adminOrdersSeed } from "./orders-data";

const countBy = (status: string) =>
  adminOrdersSeed.filter((order) => order.status === status).length;

const summary = [
  { label: "Total Orders", value: adminOrdersSeed.length, tone: "text-[#2a2927]" },
  { label: "Pending", value: countBy("pending"), tone: "text-amber-600" },
  { label: "Preparing", value: countBy("preparing"), tone: "text-sky-600" },
  { label: "Delivering", value: countBy("delivering"), tone: "text-indigo-600" },
];

export default function OrdersSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summary.map((card) => (
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
