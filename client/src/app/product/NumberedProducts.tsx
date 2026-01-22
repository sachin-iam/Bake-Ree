"use client";

import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    description:
      "Indulge in our rich, moist chocolate fudge cake layered with creamy chocolate frosting. Made with premium cocoa and fresh ingredients, this decadent dessert is perfect for celebrations or whenever you need a sweet escape. Each slice delivers an unforgettable chocolate experience.",
    image: "/images/product1.jpg",
    price: 899,
  },
  {
    id: 2,
    name: "Butter Croissant",
    description:
      "Our signature French-style croissants are baked fresh daily with European butter, creating that perfect flaky, golden exterior and soft, buttery interior. A classic breakfast treat that pairs beautifully with coffee or jam. Experience authentic French pastry craftsmanship.",
    image: "/images/croissant.jpg",
    price: 149,
  },
  {
    id: 3,
    name: "Artisan Sourdough Bread",
    description:
      "Handcrafted using traditional sourdough methods and natural fermentation, our artisan bread features a tangy flavor and chewy texture. Made with organic flour and baked to perfection, this bread is ideal for sandwiches, toast, or simply enjoyed with butter.",
    image: "/images/product2.jpg",
    price: 299,
  },
  {
    id: 4,
    name: "Blueberry Muffin",
    description:
      "Fresh blueberries burst with flavor in every bite of our tender, moist muffins. Topped with a sweet crumb topping and baked until golden, these muffins are perfect for breakfast or an afternoon snack. Made with real fruit and premium ingredients.",
    image: "/images/product3.jpg",
    price: 179,
  },
  {
    id: 5,
    name: "Apple Pie",
    description:
      "A classic American dessert featuring tender, spiced apple filling encased in our flaky, buttery pie crust. Made with fresh seasonal apples and a hint of cinnamon, this pie brings warmth and comfort to any occasion. Best served warm with a scoop of vanilla ice cream.",
    image: "/images/product4.jpg",
    price: 649,
  },
];

export default function NumberedProducts() {
  return (
    <section className="w-full">
      {mockProducts.map((product, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <div
            key={product.id}
            className="bg-[#1a2d25] hover:bg-[#afa5f7] w-full py-12 md:py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
              {/* First: Rounded Product Image */}
              <div className="flex-shrink-0 w-full md:w-64 lg:w-80">
                <div className="relative aspect-square w-full overflow-hidden rounded-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 100vw"
                  />
                </div>
              </div>

              {/* Second: Large Number */}
              <div className="flex-shrink-0 ml-12 md:ml-16 lg:ml-24">
                <div className="text-white">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-light leading-none block">
                    {number}
                  </span>
                </div>
              </div>

              {/* Third: Description */}
              <div className="flex-1 text-white max-w-xl">
                <p className="text-sm md:text-base lg:text-lg leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

