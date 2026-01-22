import clsx from "clsx";

type OpsBadgeProps = {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

const toneStyles: Record<NonNullable<OpsBadgeProps["tone"]>, string> = {
  neutral: "bg-[#f6efe6] text-[#6b6b6b]",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
  info: "bg-blue-100 text-blue-700",
};

export default function OpsBadge({ label, tone = "neutral" }: OpsBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
        toneStyles[tone]
      )}
    >
      {label}
    </span>
  );
}
