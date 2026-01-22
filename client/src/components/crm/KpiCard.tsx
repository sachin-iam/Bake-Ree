type KpiCardProps = {
  label: string;
  value: string;
  delta?: string;
  footnote?: string;
  tone?: "positive" | "neutral" | "warning";
};

const toneStyles: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  positive: "bg-[#e6f7ef] text-[#1f7a6b]",
  neutral: "bg-[#f7f5f0] text-[#4b4a47]",
  warning: "bg-[#fff3e6] text-[#9a5b13]",
};

export default function KpiCard({
  label,
  value,
  delta,
  footnote,
  tone = "neutral",
}: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-2xl font-semibold text-[#2a2927]">{value}</p>
        {delta && (
          <span
            className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
              toneStyles[tone]
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      {footnote && <p className="mt-2 text-xs text-[#8b867f]">{footnote}</p>}
    </div>
  );
}
