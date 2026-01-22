"use client";

import { useState } from "react";
import type { KitchenOrder, StockAlert } from "@/store/kitchenStore";

export type StockAlertPayload = Omit<StockAlert, "id" | "status" | "createdAt">;

type StockAlertFormProps = {
  orders: KitchenOrder[];
  onSubmit: (payload: StockAlertPayload) => void;
};

export default function StockAlertForm({ orders, onSubmit }: StockAlertFormProps) {
  const [item, setItem] = useState("");
  const [qtyRemaining, setQtyRemaining] = useState(0);
  const [unit, setUnit] = useState("units");
  const [severity, setSeverity] = useState<StockAlert["severity"]>("MEDIUM");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [affectedOrderIds, setAffectedOrderIds] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!item.trim()) return;
    onSubmit({
      item: item.trim(),
      qtyRemaining,
      unit,
      severity,
      reason: reason.trim() || "Low stock",
      note: note.trim() || undefined,
      actionType: null,
      acknowledgedBy: null,
      affectedOrderIds,
    });
    setItem("");
    setQtyRemaining(0);
    setUnit("units");
    setSeverity("MEDIUM");
    setReason("");
    setNote("");
    setAffectedOrderIds([]);
  };

  return (
    <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#2a2927]">Create stock alert</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Item</span>
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            placeholder="e.g. Flour"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Qty remaining</span>
          <input
            type="number"
            value={qtyRemaining}
            onChange={(e) => setQtyRemaining(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Unit</span>
          <input
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            placeholder="kg / packs"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Severity</span>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as StockAlert["severity"])}
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Reason</span>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            placeholder="Morning rush depletion"
          />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Note</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
            placeholder="Optional context for admin"
          />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7a6f63]">Affected orders</span>
          <select
            multiple
            value={affectedOrderIds}
            onChange={(e) =>
              setAffectedOrderIds(Array.from(e.target.selectedOptions).map((option) => option.value))
            }
            className="mt-2 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2"
          >
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="rounded-full bg-[#2a2927] px-4 py-2 text-sm font-semibold text-white"
        >
          Create Alert
        </button>
      </div>
    </div>
  );
}
