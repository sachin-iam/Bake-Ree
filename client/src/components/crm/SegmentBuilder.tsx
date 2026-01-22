type SegmentRule = {
  field: string;
  operator: string;
  value: string;
};

type SegmentBuilderProps = {
  rules: SegmentRule[];
};

export default function SegmentBuilder({ rules }: SegmentBuilderProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#2a2927]">Segment builder</h3>
          <p className="mt-1 text-xs text-[#8b867f]">
            Define rules, preview audience count, and save as a reusable segment.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#2a2927]"
        >
          Add rule
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {rules.map((rule, index) => (
          <div
            key={`${rule.field}-${index}`}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-[#efe5d8] bg-[#fbf7f1] px-4 py-3 text-sm text-[#4b4a47]"
          >
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2a2927]">
              {rule.field}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8b867f]">
              {rule.operator}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2a2927]">
              {rule.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
