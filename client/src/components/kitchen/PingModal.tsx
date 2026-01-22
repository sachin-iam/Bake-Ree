"use client";

import { useMemo, useState } from "react";

const templates = [
  "Low stock: ___",
  "Order delayed due to ___",
  "Need approval for substitution",
  "Customer note unclear",
  "READY for dispatch",
  "Driver needed for order #___",
];

export type PingPayload = {
  body: string;
  targetRole: "ADMIN" | "DELIVERY";
  template?: string;
};

type PingModalProps = {
  open: boolean;
  orderId?: string;
  onClose: () => void;
  onSubmit: (payload: PingPayload) => void;
};

export default function PingModal({ open, orderId, onClose, onSubmit }: PingModalProps) {
  const defaultTemplate = useMemo(() => templates[0], []);
  const [template, setTemplate] = useState(defaultTemplate);
  const [body, setBody] = useState("");
  const [targetRole, setTargetRole] = useState<PingPayload["targetRole"]>("ADMIN");

  if (!open) return null;

  const handleSubmit = () => {
    const message = body.trim() || template.replace("___", orderId ? `#${orderId}` : "");
    onSubmit({ body: message, targetRole, template });
    setBody("");
    setTemplate(defaultTemplate);
    setTargetRole("ADMIN");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Ping admin / delivery</p>
            <h2 className="text-xl font-semibold text-[#2a2927]">Quick message</h2>
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Template</span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            >
              {templates.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Target role</span>
            <div className="mt-2 flex gap-2">
              {["ADMIN", "DELIVERY"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRole(role as PingPayload["targetRole"])}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    targetRole === role
                      ? "border-[#2a2927] bg-[#2a2927] text-white"
                      : "border-[#eadfd1] text-[#2a2927] hover:bg-[#f4efe7]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Custom message</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="Optional details..."
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
            Send Ping
          </button>
        </div>
      </div>
    </div>
  );
}
