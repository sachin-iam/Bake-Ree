import Link from "next/link";
import clsx from "clsx";

type OpsActionButtonProps = {
  label: string;
  href: string;
  tone?: "primary" | "ghost";
};

export default function OpsActionButton({
  label,
  href,
  tone = "primary",
}: OpsActionButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40",
        tone === "primary"
          ? "bg-[#2a2927] text-white hover:bg-[#1f1e1c]"
          : "border border-black/10 text-[#2a2927] hover:bg-[#f7f5f0]"
      )}
    >
      {label}
    </Link>
  );
}
