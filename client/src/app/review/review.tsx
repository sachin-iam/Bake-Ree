"use client";

import Image from "next/image";

const reviews = [
  {
    name: "Leah Yurset",
    image: "/images/review1.jpg",
    message:
      "The strawberry shortcake is divine! Every time I visit, the bakery smells like heaven and tastes even better.",
  },
  {
    name: "Roy Gold",
    image: "/images/review2.jpg",
    message:
      "Best croissants I’ve ever had outside of France. Fresh, flaky, and full of flavor. Can’t wait to come back!",
  },
  {
    name: "Nela Yiluay",
    image: "/images/review3.jpg",
    message:
      "Super friendly staff and beautifully decorated cakes. I ordered for a party, and it was the star of the event!",
  },
];

export default function Review() {
  return (
    <section className="bg-[#f3f2ec] px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Label */}
        <span className="inline-block bg-[#2a2927] text-white text-xs tracking-widest font-semibold px-4 py-2 rounded-sm mb-6">
          Reviews
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-light text-[#2a2927] mb-16">
          What our customers are saying
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {reviews.map((review, index) => {
            const borderClass =
              index === 0
                ? "md:border-r-1" // First: remove right border
                : index === 1
                ? "md:border-x-1" // Second: remove left & right
                : "md:border-l-1"; // Third: remove only left

            return (
              <div
                key={index}
                className={`border-[2px] border-[#2a2927] rounded-sm overflow-hidden bg-[#f3f2ec] ${borderClass}`}
              >
                {/* Avatar */}
                <div className="flex justify-center py-10 mt-6 mb-6">
                  <div className="w-55 h-55 rounded-full bg-white rounded-bl-[100px] overflow-hidden relative smooth-transition-all duration-100 ease-in-out hover:scale-115">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="px-6 pb-10 text-[#2a2927] text-lg leading-relaxed text-center border-t-[2px] border-[#2a2927]">
                  <p className="py-6 mt-5">{review.message}</p>
                  <p className="font-semibold text-[#2a2927]">{review.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
