"use client";

import { useMemo, useState } from "react";
import type { InventoryItem } from "./inventory-data";
import { statusLabels } from "./inventory-data";

const statusClasses: Record<InventoryItem["status"], string> = {
  healthy: "bg-emerald-100 text-emerald-700",
  low: "bg-amber-100 text-amber-700",
  critical: "bg-rose-100 text-rose-700",
  expired: "bg-slate-200 text-slate-700",
};

type InventoryTableProps = {
  items: InventoryItem[];
  query: string;
  status: string;
  location: string;
};

export default function InventoryTable({
  items,
  query,
  status,
  location,
}: InventoryTableProps) {
  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !lowerQuery ||
        item.name.toLowerCase().includes(lowerQuery) ||
        item.sku.toLowerCase().includes(lowerQuery) ||
        item.batch.toLowerCase().includes(lowerQuery);
      const matchesStatus = status === "all" || item.status === status;
      const matchesLocation = location === "all" || item.location === location;
      return matchesQuery && matchesStatus && matchesLocation;
    });
  }, [items, query, status, location]);

  const [selected, setSelected] = useState<string[]>([]);

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((item) => item.id));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-8 text-center text-sm text-[#8b867f]">
        No inventory matches the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/10 text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">On Hand</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Reserved</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((item) => (
              <tr key={item.id} className="text-[#2a2927]">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleOne(item.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-[#9a958d]">{item.sku}</div>
                </td>
                <td className="px-4 py-4 text-sm">{item.batch}</td>
                <td className="px-4 py-4 text-sm">{item.location}</td>
                <td className="px-4 py-4 text-sm">{item.onHand}</td>
                <td className="px-4 py-4 text-sm">{item.available}</td>
                <td className="px-4 py-4 text-sm">{item.reserved}</td>
                <td className="px-4 py-4 text-sm">{item.expiry}</td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      statusClasses[item.status]
                    }`}
                  >
                    {statusLabels[item.status]}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-[#2a2927]">
                    View Ledger
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
