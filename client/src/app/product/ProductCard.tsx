"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { hashIdToNumber } from "@/utils/hashId";
import { cn } from "@/utils/cn";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  // ✅ correct: use product._id
  const pid = React.useMemo(() => hashIdToNumber(product._id), [product._id]);

  const qty = useCartStore((s) => s.getQty(pid));
  const addToCart = useCartStore((s) => s.addToCart);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);

  const onAdd = () =>
    addToCart({
      id: pid,
      name: product.name,
      image: product.image || "/placeholder.jpg",
      price: product.price,
      quantity: 1,
    });

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur",
        "shadow-sm ring-1 ring-black/5 hover:shadow-xl hover:-translate-y-0.5",
        "transition-all duration-300"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        {product.isFeatured ? (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        ) : null}
        {product.status === "inactive" || product.isActive === false ? (
          <span className="absolute right-3 top-3 rounded-full bg-gray-800/80 px-3 py-1 text-xs text-white">
            Inactive
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <div className="text-xl font-extrabold text-emerald-700">
            ₹{product.price.toLocaleString("en-IN")}
          </div>
        </div>

        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Delicious and freshly baked.</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">{product.category}</span>

          {qty === 0 ? (
            <button
              onClick={onAdd}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-semibold",
                "bg-emerald-600 text-white shadow hover:bg-emerald-700",
                "transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              )}
            >
              <span className="inline-block translate-y-[1px]">Add to Cart</span>
            </button>
          ) : (
            <div
              className={cn(
                "inline-flex items-center gap-3 rounded-full bg-emerald-50",
                "px-3 py-1.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200"
              )}
            >
              <button
                onClick={() => dec(pid)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white ring-1 ring-emerald-200 hover:bg-emerald-100 transition"
                aria-label="Decrease"
              >
                –
              </button>
              <span className="min-w-[2ch] text-center">{qty}</span>
              <button
                onClick={() => inc(pid)}
                className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
                aria-label="Increase"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
