"use client";

import { useMemo, useState } from "react";
import KitchenHeader from "@/components/kitchen/KitchenHeader";
import { useKitchenStore } from "@/store/kitchenStore";
import toast from "react-hot-toast";

const templates = [
  "Low stock: ___",
  "Order delayed due to ___",
  "Need approval for substitution",
  "Customer note unclear",
  "READY for dispatch",
  "Driver needed for order #___",
];

export default function MessagesPage() {
  const { orders, orderThreads, sendPing, addOrderMessage } = useKitchenStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id ?? null);
  const [message, setMessage] = useState("");

  const selectedThread = useMemo(
    () => orderThreads.find((thread) => thread.orderId === selectedOrderId),
    [orderThreads, selectedOrderId]
  );

  return (
    <div>
      <KitchenHeader
        title="Messages"
        subtitle="Kitchen Comms"
        description="Send pings and keep order threads synced with admin and delivery."
        isLive
      />

      <div className="w-full py-6 space-y-6">
        <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a2927]">Quick ping templates</h3>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {templates.map((template) => (
              <button
                key={template}
                onClick={() => {
                  sendPing({
                    body: template.replace("___", selectedOrderId ? `#${selectedOrderId}` : ""),
                    targetRole: template.includes("Driver") ? "DELIVERY" : "ADMIN",
                    template,
                    orderId: selectedOrderId ?? undefined,
                  });
                  toast.success("Ping sent");
                }}
                className="rounded-full border border-[#eadfd1] px-3 py-1 text-[#2a2927] hover:bg-[#f4efe7]"
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Order threads</h3>
            <select
              value={selectedOrderId ?? ""}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="mt-3 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2 text-sm"
            >
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.id}
                </option>
              ))}
            </select>
            <div className="mt-4 space-y-3 text-sm text-[#2a2927]">
              {(selectedThread?.messages ?? []).length === 0 ? (
                <p className="text-sm text-[#7a6f63]">No messages yet.</p>
              ) : (
                selectedThread?.messages.map((msg) => (
                  <div key={msg.id} className="rounded-xl border border-[#efe5d8] bg-[#faf6f0] p-3">
                    <p className="text-xs text-[#7a6f63]">{msg.sender}</p>
                    <p className="mt-1">{msg.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Add message</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Type message to attach to the order thread..."
              className="mt-3 w-full rounded-xl border border-[#eadfd1] bg-white px-3 py-2 text-sm"
            />
            <button
              onClick={() => {
                if (!selectedOrderId || !message.trim()) return;
                addOrderMessage(selectedOrderId, { sender: "Kitchen", body: message.trim() });
                setMessage("");
                toast.success("Message added to thread");
              }}
              className="mt-3 rounded-full bg-[#2a2927] px-4 py-2 text-sm font-semibold text-white"
            >
              Send message
            </button>
            <div className="mt-4 rounded-xl border border-[#efe5d8] bg-[#faf6f0] p-3 text-xs text-[#7a6f63]">
              Broadcast messages from admin will appear here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
