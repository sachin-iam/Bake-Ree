import type { ReactNode } from "react";

type OpsSectionProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  compact?: boolean;
};

export default function OpsSection({
  title,
  description,
  action,
  children,
  compact = false,
}: OpsSectionProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white shadow-sm">
      {(title || description || action) && (
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b border-black/5 ${
            compact ? "px-4 py-3" : "px-5 py-4"
          }`}
        >
          <div>
            {title && <h3 className="text-sm font-semibold text-[#2a2927]">{title}</h3>}
            {description && <p className="mt-1 text-xs text-[#7a6f63]">{description}</p>}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={compact ? "px-4 py-3" : "px-5 py-4"}>{children}</div>
    </section>
  );
}
