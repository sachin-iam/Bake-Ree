type OpsMiniChartProps = {
  label: string;
  value: string;
  trend: number[];
  tone?: "neutral" | "warning" | "danger";
};

const toneStyles: Record<NonNullable<OpsMiniChartProps["tone"]>, string> = {
  neutral: "from-[#1f7a6b]/30 to-[#1f7a6b]/5",
  warning: "from-amber-300/40 to-amber-100/10",
  danger: "from-rose-300/40 to-rose-100/10",
};

export default function OpsMiniChart({
  label,
  value,
  trend,
  tone = "neutral",
}: OpsMiniChartProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8b867f]">{label}</p>
          <p className="mt-2 text-lg font-semibold text-[#2a2927]">{value}</p>
        </div>
        <div className={`h-10 w-20 rounded-xl bg-gradient-to-b ${toneStyles[tone]}`} />
      </div>
      <div className="mt-3 grid grid-cols-8 items-end gap-1">
        {trend.map((point, index) => (
          <span
            key={`${label}-${index}`}
            className="block rounded-sm bg-[#1f7a6b]/20"
            style={{ height: `${Math.max(12, point)}px` }}
          />
        ))}
      </div>
    </div>
  );
}
