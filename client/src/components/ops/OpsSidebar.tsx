"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { opsTopNav } from "@/lib/ops/nav";

const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/ops" && pathname.startsWith(`${href}/`));

type OpsSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OpsSidebar({ isOpen, onClose }: OpsSidebarProps) {
  const pathname = usePathname();
  const navItems = useMemo(() => opsTopNav, []);

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col translate-x-0 border-r border-black/10 bg-white px-5 py-6 shadow-lg transition-transform lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:translate-x-0 lg:rounded-2xl lg:border lg:border-[#efe5d8] lg:shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f7a6b] text-sm font-semibold text-white">
              BR
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2a2927]">Bake-Ree</p>
              <p className="text-xs text-[#6b6b6b]">Operations Console</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#efe5d8] px-2 py-1 text-xs text-[#3b3b3b] transition hover:bg-[#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40 lg:hidden"
          >
            Close
          </button>
        </div>

        <nav className="no-scrollbar mt-6 min-h-0 flex-1 space-y-1 overflow-y-auto pr-2">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40",
                  active
                    ? "bg-[#1f7a6b] text-white shadow-[0_10px_20px_rgba(31,122,107,0.18)]"
                    : "text-[#2a2927] hover:bg-[#f6efe6]"
                )}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    active ? "bg-white/15" : "bg-[#fbf7f1]"
                  )}
                >
                  <Icon className={clsx("h-4 w-4", active ? "text-white" : "text-[#1f7a6b]")} />
                </span>
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#efe5d8] bg-white px-4 py-2 text-xs font-semibold text-[#2a2927] transition hover:bg-[#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
