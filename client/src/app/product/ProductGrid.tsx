"use client";

import React from "react";
import { ProductsAPI } from "@/services/products";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  search: string;
  category: string;
  sort: "newest" | "price-asc" | "price-desc";
};

export default function ProductGrid({ search, category, sort }: Props) {
  const [data, setData] = React.useState<Product[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    ProductsAPI.getAll()
      .then((p) => {
        if (!mounted) return;
        setData(p);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  let products = (data || []).slice();

  // filters
  if (search.trim()) {
    const s = search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(s));
  }
  if (category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  // sort
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "newest")
    products.sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );

  return (
    <div>
      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 mb-6 ring-1 ring-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-[28px] bg-white/70 animate-pulse shadow-sm ring-1 ring-black/5"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
