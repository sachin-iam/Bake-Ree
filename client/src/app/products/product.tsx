"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Strawberry Delight Cake",
    image: "/images/product1.jpg",
    description:
      "Delicious layers of sponge cake with whipped cream and juicy strawberries. A perfect centerpiece for your celebration.",
  },
  {
    id: 2,
    name: "Blueberry Bliss Cheesecake",
    image: "/images/product2.jpg",
    description:
      "Creamy and rich cheesecake base topped with fresh blueberries and a touch of citrus zest.",
  },
  {
    id: 3,
    name: "Hazelnut Chocolate Croissant",
    image: "/images/product3.jpg",
    description:
      "Flaky, buttery croissant filled with smooth hazelnut chocolate — your breakfast just got better.",
  },
  {
    id: 4,
    name: "Vanilla Cream Donuts",
    image: "/images/product4.jpg",
    description:
      "Soft donuts filled with silky vanilla custard and dusted with powdered sugar for a nostalgic bite.",
  },
  {
    id: 5,
    name: "Classic Baguette",
    image: "/images/product5.jpg",
    description:
      "Crisp crust, tender inside. This traditional baguette is hand-baked and perfect with everything.",
  },
  {
    id: 6,
    name: "Lemon Tart",
    image: "/images/product6.jpg",
    description:
      "Zesty lemon filling in a crisp buttery shell, topped with torched meringue for a tart treat.",
  },
];

export default function Product() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="bg-[#244438] text-white px-6 md:px-20 pt-24 pb-14 border-b border-white">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-white text-[#244438] text-xs tracking-widest font-semibold px-4 py-2 rounded-br-xl mb-6">
            PRODUCTS
          </span>
          <h2 className="text-4xl text-[#f3f2ec] md:text-5xl font-light leading-tight mb-6">
            Baked Fresh, Loved Always.
          </h2>
          <p className="text-lg text-[#f3f2ec] max-w-2xl">
            Every treat is made with care and the finest ingredients to bring
            joy to every bite. Discover what’s fresh today.
          </p>
        </div>
      </section>

      {/* Product List */}
      <section className="w-full">
        {products.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`product-card transition-all duration-500 px-6 md:px-20 py-10 w-full flex flex-col md:flex-row items-center gap-10 md:gap-20 border-b border-white/50 ${
              hoveredId === item.id ? "bg-[#afa5f7]" : "bg-[#244438]"
            }`}
          >
            {/* Image */}
            <div className="w-32 h-32 rounded-xl overflow-hidden relative flex-shrink-0 shadow-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col gap-3 max-w-3xl flex-grow transition-colors duration-500 ${
                hoveredId === item.id ? "text-black" : "text-[#f3f2ec]"
              }`}
            >
              <h3 className="text-3xl font-semibold">{item.name}</h3>
              <p className="text-lg leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
