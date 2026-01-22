"use client";

import { useMemo } from "react";
import type { InventoryItem } from "./inventory-data";

type InventoryFiltersProps = {
  items: InventoryItem[];
  query: string;
  status: string;
  location: string;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

export default function InventoryFilters({
  items,
  query,
  status,
  location,
  onQueryChange,
  onStatusChange,
  onLocationChange,
}: InventoryFiltersProps) {
  const locations = useMemo(
    () => Array.from(new Set(items.map((item) => item.location))),
    [items]
  );

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_auto]">
        <label className="block text-sm text-[#5c5a56]">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search SKU, product, or batch"
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
            <option value="healthy">Healthy</option>
            <option value="low">Low</option>
            <option value="critical">Critical</option>
            <option value="expired">Expired</option>
          </select>
        </label>

        <label className="block text-sm text-[#5c5a56]">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a958d]">
            Location
          </span>
          <select
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#2a2927] shadow-sm"
          >
            <option value="all">All</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-2">
          <button className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white">
            Export
          </button>
          <button className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927]">
            New Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}
