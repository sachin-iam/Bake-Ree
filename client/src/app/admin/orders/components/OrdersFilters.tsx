"use client";

import { useMemo } from "react";
import type { AdminOrder } from "./orders-data";

type OrdersFiltersProps = {
  items: AdminOrder[];
  query: string;
  status: string;
  type: string;
  channel: string;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onChannelChange: (value: string) => void;
};

export default function OrdersFilters({
  items,
  query,
  status,
  type,
  channel,
  onQueryChange,
  onStatusChange,
  onTypeChange,
  onChannelChange,
}: OrdersFiltersProps) {
  const channels = useMemo(
    () => Array.from(new Set(items.map((item) => item.channel))),
    [items]
  );

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <label className="block text-sm text-[#5c5a56]">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search order ID or customer"
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#2a2927] shadow-sm"
          />
        </label>

        <label className="block text-sm text-[#5c5a56]">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            Status
          </span>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#2a2927] shadow-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label className="block text-sm text-[#5c5a56]">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            Order Type
          </span>
          <select
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#2a2927] shadow-sm"
          >
            <option value="all">All</option>
            <option value="Delivery">Delivery</option>
            <option value="Pickup">Pickup</option>
          </select>
        </label>

        <label className="block text-sm text-[#5c5a56]">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            Channel
          </span>
          <select
            value={channel}
            onChange={(event) => onChannelChange(event.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#2a2927] shadow-sm"
          >
            <option value="all">All</option>
            {channels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-2">
          <button className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white">
            Export
          </button>
          <button className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927]">
            New Order
          </button>
        </div>
      </div>
    </div>
  );
}
