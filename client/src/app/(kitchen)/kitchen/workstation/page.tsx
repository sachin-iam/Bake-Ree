"use client";

import { useMemo } from "react";
import KitchenHeader from "@/components/kitchen/KitchenHeader";
import { useKitchenStore } from "@/store/kitchenStore";
import toast from "react-hot-toast";

export default function WorkstationPage() {
  const { orders, setOrderStatus } = useKitchenStore();

  const myOrders = useMemo(() => orders.filter((order) => order.assignedTo === "Me"), [orders]);

  return (
    <div>
      <KitchenHeader
        title="Workstation"
        subtitle="My Station"
        description="Focus on assigned orders, timers, and station checklists."
        isLive
      />

      <div className="w-full py-6 space-y-6">
        <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a2927]">Assigned orders</h3>
          {myOrders.length === 0 ? (
            <p className="mt-3 text-sm text-[#7a6f63]">No orders assigned yet.</p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {myOrders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-[#efe5d8] bg-[#faf6f0] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#2a2927]">#{order.id}</p>
                      <p className="text-xs text-[#7a6f63]">
                        {order.station} · {order.priority}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#2a2927]">{order.status}</span>
                  </div>
                  <div className="mt-3 text-xs text-[#7a6f63]">
                    Prep timer: {order.status === "PREPARING" ? "running" : "idle"}
                  </div>
                  <div className="mt-3 flex gap-2 text-xs font-semibold">
                    <button
                      onClick={() => {
                        setOrderStatus(order.id, "PREPARING");
                        toast.success(`Started ${order.id}`);
                      }}
                      className="rounded-full border border-[#eadfd1] px-3 py-1 text-[#2a2927] hover:bg-[#f4efe7]"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => {
                        setOrderStatus(order.id, "READY");
                        toast.success(`Marked ${order.id} ready`);
                      }}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-900"
                    >
                      Ready
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Station checklist</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#7a6f63]">
              <li>• Preheat oven / fryer</li>
              <li>• Check ingredient bins</li>
              <li>• Sanitize prep surface</li>
              <li>• Confirm packaging supplies</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Quick issue buttons</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              {["Missing ingredient", "Equipment issue", "Allergy check", "Delay risk"].map((issue) => (
                <button
                  key={issue}
                  onClick={() => toast.success(`Issue logged: ${issue}`)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-rose-900"
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
