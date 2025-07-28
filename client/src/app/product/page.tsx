"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useCartStore } from "../../store/cartStore";

const products = [
  {
    id: 1,
    name: "Strawberry Delight Cake",
    image: "/images/product1.jpg",
    price: 399,
    description: "Delicious sponge cake with whipped cream and strawberries.",
  },
  {
    id: 2,
    name: "Blueberry Bliss Cheesecake",
    image: "/images/product2.jpg",
    price: 499,
    description: "Rich cheesecake topped with fresh blueberries.",
  },
  {
    id: 3,
    name: "Hazelnut Chocolate Croissant",
    image: "/images/product3.jpg",
    price: 199,
    description: "Flaky croissant filled with hazelnut chocolate.",
  },
  {
    id: 4,
    name: "Vanilla Cream Donuts",
    image: "/images/product4.jpg",
    price: 149,
    description: "Donuts filled with creamy vanilla custard.",
  },
  {
    id: 5,
    name: "Classic Baguette",
    image: "/images/product5.jpg",
    price: 99,
    description: "Crispy outside, soft inside. A classic loaf.",
  },
  {
    id: 6,
    name: "Lemon Tart",
    image: "/images/product6.jpg",
    price: 299,
    description: "Zesty lemon filling with torched meringue.",
  },
];

export default function ProductsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { cart, addToCart, updateQuantity } = useCartStore();
  const cartRef = useRef<HTMLElement | null>(null);

  if (typeof window !== "undefined" && !cartRef.current) {
    cartRef.current = document.getElementById("cart-icon");
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    const image = (
      e.currentTarget.closest(".product-card") as HTMLElement
    )?.querySelector("img") as HTMLImageElement;
    const cart = cartRef.current;

    if (!image || !cart) {
      addToCart({ ...product, quantity: 1 });
      return;
    }

    const imageRect = image.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = image.cloneNode(true) as HTMLImageElement;
    flyingImg.style.position = "fixed";
    flyingImg.style.left = `${imageRect.left}px`;
    flyingImg.style.top = `${imageRect.top}px`;
    flyingImg.style.width = `${imageRect.width}px`;
    flyingImg.style.height = `${imageRect.height}px`;
    flyingImg.style.zIndex = "9999";
    flyingImg.style.borderRadius = "0.5rem";
    flyingImg.style.transition = "all 0.8s ease-in-out";
    flyingImg.style.opacity = "0.9";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.left = `${cartRect.left + cartRect.width / 2 - 10}px`;
      flyingImg.style.top = `${cartRect.top + cartRect.height / 2 - 10}px`;
      flyingImg.style.width = `20px`;
      flyingImg.style.height = `20px`;
      flyingImg.style.opacity = "0";
    });

    setTimeout(() => {
      document.body.removeChild(flyingImg);
      addToCart({ ...product, quantity: 1 });
    }, 800);
  };

  const getCartItem = (id: number) => cart.find((i) => i.id === id);

  return (
    <main className="bg-[#f3f2ec] min-h-screen pt-32 px-6 md:px-16 pb-18">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-[#2a2927] mb-4">
          Our Products
        </h1>
        <p className="text-center text-[#2a2927]/70 mb-12 max-w-2xl mx-auto">
          Discover our handcrafted selection of fresh breads, pastries, and
          desserts made daily with love.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => {
            const existing = getCartItem(product.id);

            return (
              <div
                key={product.id}
                className="product-card bg-white rounded-2xl overflow-hidden shadow-lg border border-[#ccc] transition-all duration-500 hover:shadow-xl h-full flex flex-col"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Apply consistent height and layout */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-[#2a2927]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#2a2927]/70">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-[#2a2927]">
                      ₹{product.price}
                    </span>

                    {existing ? (
                      <div className="flex items-center text-black gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="bg-[#7f6df2] text-white px-3 py-1 rounded-full"
                        >
                          −
                        </button>
                        <span>{existing.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="bg-[#7f6df2] text-white px-3 py-1 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="text-sm bg-[#7f6df2] text-white px-4 py-2 rounded-full hover:bg-black"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
