type RecommendationItem = {
  product: string;
  reason: string;
  confidence: string;
};

type RecommendationPanelProps = {
  title?: string;
  items: RecommendationItem[];
};

export default function RecommendationPanel({
  title = "AI + Rule Recommendations",
  items,
}: RecommendationPanelProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#2a2927]">{title}</h3>
          <p className="mt-1 text-xs text-[#8b867f]">
            Rule-based now with a plug-in AI model later. Capture feedback to train.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.product}
            className="rounded-xl border border-[#efe5d8] bg-[#fbf7f1] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#2a2927]">{item.product}</p>
                <p className="mt-1 text-xs text-[#6b6b6b]">{item.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#4b4a47]">
                  {item.confidence}
                </span>
                <button
                  type="button"
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#2a2927]"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#2a2927]"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
