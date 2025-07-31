"use client";

import React from "react";
import ProductGrid from "./ProductGrid";
import FilterBar from "./FilterBar";

export default function ProductsPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [sort, setSort] = React.useState<"newest" | "price-asc" | "price-desc">("newest");

  return (
    <main className="min-h-screen bg-[#efefe8]">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 mt-15">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Our Signature Creations
          </h1>
          <p className="mt-2 text-gray-600">
            Discover freshly baked delights crafted with care and the finest ingredients.
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
