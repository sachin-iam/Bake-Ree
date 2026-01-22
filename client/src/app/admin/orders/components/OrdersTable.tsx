"use client";

import { useMemo } from "react";
import type { AdminOrder } from "./orders-data";
import { statusLabels } from "./orders-data";

const statusClasses: Record<AdminOrder["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  preparing: "bg-sky-100 text-sky-700",
  ready: "bg-emerald-100 text-emerald-700",
  delivering: "bg-indigo-100 text-indigo-700",
  delivered: "bg-slate-200 text-slate-700",
  cancelled: "bg-rose-100 text-rose-700",
};

type OrdersTableProps = {
  items: AdminOrder[];
  query: string;
  status: string;
  type: string;
  channel: string;
};

export default function OrdersTable({
  items,
  query,
  status,
  type,
  channel,
}: OrdersTableProps) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q);
      const matchesStatus = status === "all" || item.status === status;
      const matchesType = type === "all" || item.orderType === type;
      const matchesChannel = channel === "all" || item.channel === channel;
      return matchesQuery && matchesStatus && matchesType && matchesChannel;
    });
  }, [items, query, status, type, channel]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-8 text-center text-sm text-[#8b867f]">
        No orders match the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/10 text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Channel</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Placed</th>
              <th className="px-4 py-3">ETA</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((item) => (
              <tr key={item.id} className="text-[#2a2927]">
                <td className="px-4 py-4 font-semibold">{item.id}</td>
                <td className="px-4 py-4">{item.customer}</td>
                <td className="px-4 py-4 text-sm">{item.channel}</td>
                <td className="px-4 py-4 text-sm">{item.orderType}</td>
                <td className="px-4 py-4 text-sm">{item.placedAt}</td>
                <td className="px-4 py-4 text-sm">{item.eta}</td>
                <td className="px-4 py-4 text-sm">₹{item.total}</td>
                <td className="px-4 py-4 text-sm">{item.payment}</td>
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
                    View
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
