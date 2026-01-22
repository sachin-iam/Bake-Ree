"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { OpsSubNavGroup } from "@/lib/ops/nav";

const getMatchScore = (pathname: string, href: string) => {
  if (href.includes("[id]")) {
    const base = href.split("[id]")[0];
    return pathname.startsWith(base) ? base.length : -1;
  }
  if (pathname === href) return href.length + 1000;
  if (pathname.startsWith(`${href}/`)) return href.length;
  return -1;
};

type OpsSubSidebarProps = {
  title: string;
  groups: OpsSubNavGroup[];
  isOpen: boolean;
  onClose: () => void;
};

export default function OpsSubSidebar({
  title,
  groups,
  isOpen,
  onClose,
}: OpsSubSidebarProps) {
  const pathname = usePathname();
  const activeHref = groups
    .flatMap((group) => group.items)
    .map((item) => ({ href: item.href, score: getMatchScore(pathname, item.href) }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)[0]?.href;

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-black/30 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col translate-x-0 border-r border-black/10 bg-white px-5 py-6 shadow-lg transition-transform lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:translate-x-0 lg:rounded-2xl lg:border lg:border-[#efe5d8] lg:shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b4f2a]">
              {title}
            </p>
            <p className="text-sm font-semibold text-[#2a2927]">Module Navigation</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#efe5d8] px-2 py-1 text-xs text-[#3b3b3b] transition hover:bg-[#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40 lg:hidden"
          >
            Close
          </button>
        </div>

        <div className="no-scrollbar mt-6 min-h-0 flex-1 space-y-6 overflow-y-auto pr-2">
          {groups.map((group) => (
            <div key={group.key}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b4f2a]">
                {group.label}
              </p>
              <div className="mt-3 space-y-1">
                {group.items.map((item) => {
                  const active = item.href === activeHref;
                  return (
                    <Link
                      key={item.href}
                      href={item.href.replace("[id]", "1")}
                      className={clsx(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40",
                        active
                          ? "bg-[#e6f7ef] text-[#1f7a6b]"
                          : "text-[#2a2927] hover:bg-[#f6efe6]"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#7a6f63]">
                        {active ? "Active" : ""}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
