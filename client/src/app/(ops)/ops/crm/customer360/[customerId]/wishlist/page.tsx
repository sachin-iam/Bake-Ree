import RecommendationPanel from "@/components/crm/RecommendationPanel";

const wishlistItems = [
  { item: "Chocolate truffle cake", added: "12d ago", intent: "High" },
  { item: "Whole wheat muffins", added: "7d ago", intent: "Medium" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#2a2927]">Wishlist items</h3>
        <div className="mt-4 space-y-2">
          {wishlistItems.map((item) => (
            <div
              key={item.item}
              className="flex items-center justify-between rounded-xl border border-[#efe5d8] bg-[#fbf7f1] px-4 py-3 text-sm text-[#4b4a47]"
            >
              <span>{item.item}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8b867f]">
                {item.intent} intent
              </span>
            </div>
          ))}
        </div>
      </section>

      <RecommendationPanel
        title="Wishlist conversion ideas"
        items={[
          {
            product: "10% off chocolate truffle cake",
            reason: "Wishlist item with 12-day intent window",
            confidence: "0.76",
          },
        ]}
      />
    </div>
  );
}
