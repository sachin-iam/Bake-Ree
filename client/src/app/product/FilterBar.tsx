"use client";

import React from "react";
import { cn } from "@/utils/cn";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  sort: "newest" | "price-asc" | "price-desc";
  onSort: (v: "newest" | "price-asc" | "price-desc") => void;
};

const categories = ["all", "Breads", "Pastries", "Cakes", "Cookies", "Others"];

export default function FilterBar({
  search,
  onSearch,
  category,
  onCategory,
  sort,
  onSort,
}: Props) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Search */}
      <div className="col-span-1 md:col-span-1">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name…"
            className={cn(
              "w-full rounded-2xl bg-white/70 backdrop-blur",
              "px-4 py-3 shadow-sm ring-1 ring-black/5 outline-none",
              "focus:ring-2 focus:ring-emerald-400 transition"
            )}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌘K</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategory(c)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              "border border-transparent bg-white/70 hover:bg-white shadow-sm",
              category === c && "border-emerald-500 bg-emerald-50 text-emerald-700"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center md:justify-end">
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as any)}
          className="rounded-2xl bg-white/70 backdrop-blur px-4 py-3 shadow-sm ring-1 ring-black/5 outline-none focus:ring-2 focus:ring-emerald-400 transition w-full md:w-auto"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}
