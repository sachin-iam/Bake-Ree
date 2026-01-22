type InsightPillsProps = {
  label: string;
  items: string[];
};

export default function InsightPills({ label, items }: InsightPillsProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#efe5d8] bg-[#fbf7f1] px-3 py-1 text-xs font-semibold text-[#6b4f2a]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
