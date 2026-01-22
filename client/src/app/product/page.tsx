"use client";

import React from "react";
import ProductGrid from "./ProductGrid";
import FilterBar from "./FilterBar";

export default function ProductsPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [sort, setSort] = React.useState<"newest" | "price-asc" | "price-desc">("newest");

  return (
    <main className="min-h-screen bg-[#f3f2ec] bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f3f2ec_55%,_#efece0_100%)]">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0ea] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#244438]">
            Freshly Baked
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight text-[#2a2927]">
            Our Signature Creations
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-[#4a4a46]">
            Discover baked delights crafted with care, seasonal ingredients, and a touch of joy.
          </p>
        </div>

        <FilterBar
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
        />

        <ProductGrid search={search} category={category} sort={sort} />
      </section>
    </main>
  );
}
