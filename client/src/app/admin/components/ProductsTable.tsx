"use client";

import React from "react";
import { ProductsAPI } from "@/services/products";
import type { Product } from "@/types";

export default function ProductsTable() {
  const [items, setItems] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [deleting, setDeleting] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    setLoading(true);
    ProductsAPI.getAll()
      .then((p) => {
        setItems(p);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      setDeleting(id);
      await ProductsAPI.deleteById(id);
      setItems((s) => s.filter((x) => x._id !== id));
    } catch (e: any) {
      alert(e.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 ring-1 ring-red-200">
          {error}
        </div>
      )}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-white/60 animate-pulse ring-1 ring-black/5" />
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <li
              key={p._id}
              className="flex items-center justify-between rounded-2xl bg-white ring-1 ring-black/5 px-5 py-4 shadow-sm"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-900 truncate">{p.name}</p>
                  {p.status === "inactive" || p.isActive === false ? (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 ring-1 ring-gray-200">
                      Inactive
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-gray-500">{p.category}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">₹{p.price.toLocaleString("en-IN")}</span>
                  <span className="ml-2 text-gray-400">Stock: {p.stock}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-amber-700 hover:bg-amber-100 transition">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    disabled={deleting === p._id}
                    className="rounded-lg bg-rose-100 px-3 py-1.5 text-rose-700 hover:bg-rose-200 transition disabled:opacity-60"
                  >
                    {deleting === p._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
