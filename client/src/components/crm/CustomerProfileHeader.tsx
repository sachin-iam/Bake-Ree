type CustomerProfileHeaderProps = {
  name: string;
  tier: string;
  churnRisk: string;
  outstanding: string;
  tags: string[];
};

export default function CustomerProfileHeader({
  name,
  tier,
  churnRisk,
  outstanding,
  tags,
}: CustomerProfileHeaderProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
            Customer 360
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#2a2927]">{name}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#efe5d8] bg-[#fbf7f1] px-3 py-1 text-xs font-semibold text-[#6b4f2a]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-[#f7f5f0] px-3 py-2 text-xs font-semibold text-[#4b4a47]">
            Tier: {tier}
          </span>
          <span className="rounded-full bg-[#fff3e6] px-3 py-2 text-xs font-semibold text-[#9a5b13]">
            Churn risk: {churnRisk}
          </span>
          <span className="rounded-full bg-[#fdeeee] px-3 py-2 text-xs font-semibold text-[#a33a3a]">
            Outstanding: {outstanding}
          </span>
        </div>
      </div>
    </section>
  );
}
