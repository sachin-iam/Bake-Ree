import React from "react";

const rituals = [
  {
    title: "Dawn Dough",
    description:
      "We begin before sunrise, keeping the dough cool and slow for a deeper, cleaner flavor.",
  },
  {
    title: "Quiet Proof",
    description:
      "Time does the work. Each batch rests until the crumb is airy and the crust sings.",
  },
  {
    title: "Hand Finish",
    description:
      "Glazes, folds, and final touches are done by hand so every detail feels personal.",
  },
];

export default function Ritual() {
  return (
    <section className="relative bg-[#f3f2ec] px-6 py-20 overflow-hidden">
      <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[#b6d3e5] opacity-40" />
      <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#afa5f7] opacity-25" />

      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center relative">
        <div>
          <span className="inline-block bg-[#2a2927] text-white text-xs tracking-widest font-semibold px-4 py-2 rounded-sm mb-6">
            THE RITUAL
          </span>
          <h2 className="headline-serif text-4xl md:text-5xl font-light text-[#2a2927] leading-tight mb-6">
            An elegant <span className="brush-underline">routine</span>,
            <br />
            baked into every day
          </h2>
          <p className="text-lg text-[#2a2927] max-w-xl">
            Bake Ree is built on small gestures that feel luxurious: slow
            fermentation, careful shaping, and a finish that looks as good as it
            tastes. It is a calm, consistent rhythm you can count on.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {["Small batches", "Seasonal ingredients", "Made to order"].map(
              (item) => (
                <span
                  key={item}
                  className="border border-[#2a2927] text-[#2a2927] text-sm px-4 py-2 rounded-full"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="space-y-6">
          {rituals.map((ritual, index) => (
            <div
              key={ritual.title}
              className="flex gap-6 items-start bg-white/80 border border-[#2a2927] rounded-3xl px-6 py-6 shadow-sm"
            >
              <div className="text-[#2a2927] text-3xl font-light w-10 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-xl text-[#2a2927] font-medium mb-2">
                  {ritual.title}
                </h3>
                <p className="text-[#2a2927] text-base leading-relaxed">
                  {ritual.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
