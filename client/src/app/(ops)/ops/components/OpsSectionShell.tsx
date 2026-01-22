import Link from "next/link";

export type OpsSectionShellProps = {
  title: string;
  subtitle: string;
  description: string;
  items?: { title: string; detail: string }[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export default function OpsSectionShell({
  title,
  subtitle,
  description,
  items = [],
  primaryAction,
  secondaryAction,
}: OpsSectionShellProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
          {subtitle}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#2a2927]">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#5c5a56]">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927] transition hover:bg-[#f7f5f0]"
              >
                {secondaryAction.label}
              </Link>
            )}
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white"
              >
                {primaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {items.length > 0 && (
        <section className="grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/10 bg-white p-5"
            >
              <h3 className="text-lg font-semibold text-[#2a2927]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#5c5a56]">{item.detail}</p>
            </div>
          ))}
        </section>
      )}

      <section className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-5 text-sm text-[#8b867f]">
        Skeleton view only. Data tables, filters, and workflows will be wired in
        the next steps.
      </section>
    </div>
  );
}
