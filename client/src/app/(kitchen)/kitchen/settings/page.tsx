"use client";

import KitchenHeader from "@/components/kitchen/KitchenHeader";

export default function SettingsPage() {
  return (
    <div>
      <KitchenHeader
        title="Kitchen Settings"
        subtitle="Configuration"
        description="Tune station defaults, alerts, and shift preferences."
        isLive
      />

      <div className="w-full py-6 space-y-6">
        <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a2927]">Shift defaults</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm">
            <label className="flex items-center justify-between rounded-2xl border border-[#efe5d8] px-4 py-3">
              <span>Auto-refresh queue</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-[#efe5d8] px-4 py-3">
              <span>Play sound on new order</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-[#efe5d8] px-4 py-3">
              <span>Show dispatch timeline</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-[#efe5d8] px-4 py-3">
              <span>Prioritize rush orders</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm text-center">
          <p className="text-lg font-semibold text-[#2a2927]">No additional settings yet</p>
          <p className="mt-2 text-sm text-[#7a6f63]">More kitchen configuration options will appear here.</p>
        </div>
      </div>
    </div>
  );
}
