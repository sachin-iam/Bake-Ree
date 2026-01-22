"use client";

import { useMemo, useState } from "react";
import type { KitchenOrder } from "@/store/kitchenStore";

const reasons = [
  "Missing ingredient",
  "Item unavailable (substitution needed)",
  "Equipment issue",
  "Allergy clarification needed",
  "Special instructions unclear",
  "Rush overload / delay",
  "Quality issue",
];

export type HoldOrderPayload = {
  reason: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  notes?: string;
};

type HoldOrderModalProps = {
  open: boolean;
  order: KitchenOrder | null;
  onClose: () => void;
  onSubmit: (payload: HoldOrderPayload) => void;
};

export default function HoldOrderModal({ open, order, onClose, onSubmit }: HoldOrderModalProps) {
  const defaultReason = useMemo(() => reasons[0], []);
  const [reason, setReason] = useState(defaultReason);
  const [severity, setSeverity] = useState<HoldOrderPayload["severity"]>("WARNING");
  const [notes, setNotes] = useState("");

  if (!open || !order) return null;

  const handleSubmit = () => {
    onSubmit({ reason, severity, notes: notes.trim() || undefined });
    setReason(defaultReason);
    setSeverity("WARNING");
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Hold order</p>
            <h2 className="text-xl font-semibold text-[#2a2927]">#{order.id}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#eadfd1] px-3 py-1 text-xs text-[#2a2927]"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Reason</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            >
              {reasons.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Severity</span>
            <div className="mt-2 flex gap-2">
              {["INFO", "WARNING", "CRITICAL"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSeverity(level as HoldOrderPayload["severity"])}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    severity === level
                      ? "border-[#2a2927] bg-[#2a2927] text-white"
                      : "border-[#eadfd1] text-[#2a2927] hover:bg-[#f4efe7]"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add optional details for admin..."
              className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-[#eadfd1] px-4 py-2 text-sm text-[#2a2927]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-full bg-[#2a2927] px-4 py-2 text-sm font-semibold text-white"
          >
            Place Hold
          </button>
        </div>
      </div>
    </div>
  );
}
