import OrdersPanel from "./components/OrdersPanel";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
          Admin / Orders
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#2a2927]">Orders</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#5c5a56]">
              Review, filter, and manage the full order lifecycle with SLA
              indicators and operational visibility.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927]">
              Export
            </button>
            <button className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white">
              Create Manual Order
            </button>
          </div>
        </div>
      </section>

      <OrdersPanel />
    </div>
  );
}
