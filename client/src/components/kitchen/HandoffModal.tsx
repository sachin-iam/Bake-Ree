"use client";

import { useState } from "react";
import type { KitchenOrder, KitchenOrderType } from "@/store/kitchenStore";

export type HandoffPayload = {
  type: KitchenOrderType;
  packingRequired: boolean;
  expectedPickupTime?: string;
  notifyAdmin: boolean;
  notifyDelivery: boolean;
  notes?: string;
};

type HandoffModalProps = {
  open: boolean;
  order: KitchenOrder | null;
  onClose: () => void;
  onSubmit: (payload: HandoffPayload) => void;
};

export default function HandoffModal({ open, order, onClose, onSubmit }: HandoffModalProps) {
  const [packingRequired, setPackingRequired] = useState(true);
  const [expectedPickupTime, setExpectedPickupTime] = useState("");
  const [notifyAdmin, setNotifyAdmin] = useState(true);
  const [notifyDelivery, setNotifyDelivery] = useState(true);
  const [notes, setNotes] = useState("");

  if (!open || !order) return null;

  const handleSubmit = () => {
    onSubmit({
      type: order.orderType,
      packingRequired,
      expectedPickupTime: expectedPickupTime.trim() || undefined,
      notifyAdmin,
      notifyDelivery,
      notes: notes.trim() || undefined,
    });
    setPackingRequired(true);
    setExpectedPickupTime("");
    setNotifyAdmin(true);
    setNotifyDelivery(true);
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Handoff request</p>
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
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Handoff type</span>
            <p className="mt-2 rounded-xl border border-[#eadfd1] bg-[#f9f6f1] px-3 py-2 text-[#2a2927]">
              {order.orderType}
            </p>
          </div>

          <label className="flex items-center justify-between rounded-2xl border border-[#eadfd1] px-4 py-3">
            <div>
              <p className="font-semibold text-[#2a2927]">Packing required</p>
              <p className="text-xs text-[#7a6f63]">Include packing checklist for dispatch.</p>
            </div>
            <input
              type="checkbox"
              checked={packingRequired}
              onChange={(e) => setPackingRequired(e.target.checked)}
              className="h-4 w-4"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Expected pickup time</span>
            <input
              value={expectedPickupTime}
              onChange={(e) => setExpectedPickupTime(e.target.value)}
              placeholder="e.g. 20 min"
              className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            />
          </label>

          <div className="grid gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifyAdmin}
                onChange={(e) => setNotifyAdmin(e.target.checked)}
              />
              <span className="text-sm text-[#2a2927]">Notify Admin</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifyDelivery}
                onChange={(e) => setNotifyDelivery(e.target.checked)}
              />
              <span className="text-sm text-[#2a2927]">Notify Dispatch / Delivery Team</span>
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Optional packing or pickup notes..."
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
            Send Handoff
          </button>
        </div>
      </div>
    </div>
  );
}
