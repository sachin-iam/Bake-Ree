import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: string;
};

export default function ChartCard({ title, subtitle, children, footer }: ChartCardProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#2a2927]">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-[#8b867f]">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4 h-48 w-full">{children}</div>
      {footer && <p className="mt-3 text-xs text-[#8b867f]">{footer}</p>}
    </section>
  );
}
