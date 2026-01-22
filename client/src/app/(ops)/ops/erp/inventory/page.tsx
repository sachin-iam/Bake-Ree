import InventoryPanel from "./components/InventoryPanel";

export default function OpsInventoryPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
          ERP / Inventory
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#2a2927]">Inventory</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#5c5a56]">
              Stock ledger with batch tracking, expiry visibility, and multi-location
              controls. This module drives availability for orders and production.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927]">
              Create Transfer
            </button>
            <button className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white">
              New Stock Intake
            </button>
          </div>
        </div>
      </section>

      <InventoryPanel />
    </div>
  );
}
