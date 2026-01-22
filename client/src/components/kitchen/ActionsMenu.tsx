"use client";

import { useEffect, useRef, useState } from "react";

type ActionItem = {
  label: string;
  onClick: () => void;
  tone?: "danger" | "default";
};

type ActionsMenuProps = {
  actions: ActionItem[];
};

export default function ActionsMenu({ actions }: ActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#eadfd1] text-sm font-semibold text-[#2a2927] transition hover:bg-[#f6efe6]"
        aria-label="More actions"
      >
        •••
      </button>
      {open && (
        <div className="absolute right-0 bottom-full z-20 mb-2 w-44 rounded-2xl border border-[#efe5d8] bg-white p-2 shadow-lg">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                action.onClick();
                setOpen(false);
              }}
              className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                action.tone === "danger"
                  ? "text-rose-600 hover:bg-rose-50"
                  : "text-[#2a2927] hover:bg-[#f6efe6]"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
