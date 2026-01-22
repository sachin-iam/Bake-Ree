"use client";

import KitchenHeader from "@/components/kitchen/KitchenHeader";
import toast from "react-hot-toast";

export default function PrepPage() {
  return (
    <div>
      <KitchenHeader
        title="Prep & Batches"
        subtitle="Batch Planning"
        description="Track batch plans, yields, waste, and QC results."
        isLive
      />

      <div className="w-full py-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Today’s batch plan</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#7a6f63]">
              <li>• Sourdough loaves — 48 planned / 32 completed</li>
              <li>• Croissants — 60 planned / 45 completed</li>
              <li>• Brioche buns — 30 planned / 12 completed</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Recipe quick view</h3>
            <p className="mt-3 text-sm text-[#7a6f63]">Tap a recipe to view ingredients, yield, and QC notes.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              {["Sourdough", "Brioche", "Almond Croissant"].map((item) => (
                <button
                  key={item}
                  onClick={() => toast.success(`Opened recipe: ${item}`)}
                  className="rounded-full border border-[#eadfd1] px-3 py-1 text-[#2a2927] hover:bg-[#f4efe7]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Batch run</h3>
            <div className="mt-3 text-sm text-[#7a6f63]">
              Planned vs actual yields will appear here.
            </div>
            <button
              onClick={() => toast.success("Batch run logged")}
              className="mt-4 rounded-full bg-[#2a2927] px-4 py-2 text-sm font-semibold text-white"
            >
              Log batch output
            </button>
          </div>
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Waste entry & QC</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <button
                onClick={() => toast.success("Waste entry logged")}
                className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-rose-900"
              >
                Log waste
              </button>
              <button
                onClick={() => toast.success("QC pass recorded")}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-900"
              >
                QC pass
              </button>
              <button
                onClick={() => toast.success("QC fail recorded")}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-900"
              >
                QC fail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
