"use client";

import Link from "next/link";
import { Menu, PanelLeftClose, PanelRightClose } from "lucide-react";
import clsx from "clsx";

export type OpsBreadcrumb = {
  label: string;
  href: string;
};

type OpsHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs: OpsBreadcrumb[];
  onToggleSidebar: () => void;
  onToggleSubnav?: () => void;
  showSubnavToggle?: boolean;
  actions?: React.ReactNode;
};

export default function OpsHeader({
  title,
  description,
  breadcrumbs,
  onToggleSidebar,
  onToggleSubnav,
  showSubnavToggle,
  actions,
}: OpsHeaderProps) {
  return (
    <header className="border-b border-[#efe5d8] bg-white px-4 py-5 -mx-4 -mt-4 lg:px-6 lg:-mx-6 lg:-mt-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-[#6b6b6b]">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#efe5d8] text-[#3f3f3f] transition hover:bg-[#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40 lg:hidden"
              aria-label="Toggle main navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            {showSubnavToggle && onToggleSubnav && (
              <button
                type="button"
                onClick={onToggleSubnav}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#efe5d8] text-[#3f3f3f] transition hover:bg-[#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40 lg:hidden"
                aria-label="Toggle section navigation"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            )}
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.href}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 && <span className="text-[#c1b6a7]">/</span>}
                <Link
                  href={crumb.href}
                  className={clsx(
                    "transition hover:text-[#2a2927] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40",
                    index === breadcrumbs.length - 1 && "text-[#2a2927]"
                  )}
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
          <div>
            <h1 className="text-2xl font-semibold text-[#2a2927]">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-[#6b6b6b]">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showSubnavToggle && onToggleSubnav && (
            <button
              type="button"
              onClick={onToggleSubnav}
              className="hidden items-center gap-2 rounded-full border border-[#efe5d8] px-3 py-2 text-xs text-[#2a2927] transition hover:bg-[#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a6b]/40 lg:flex"
            >
              <PanelRightClose className="h-4 w-4" />
              Sections
            </button>
          )}
          {actions}
        </div>
      </div>
    </header>
  );
}
