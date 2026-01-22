"use client";

import clsx from "clsx";
import type { StockAlert } from "@/store/kitchenStore";

const statusStyles: Record<StockAlert["status"], string> = {
  OPEN: "bg-rose-100 text-rose-900",
  ACK: "bg-amber-100 text-amber-900",
  IN_PROGRESS: "bg-sky-100 text-sky-900",
  RESOLVED: "bg-emerald-100 text-emerald-900",
};

type AlertsTableProps = {
  alerts: StockAlert[];
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
  onActionType: (id: string, actionType: "REFILL" | "PURCHASE") => void;
};

export default function AlertsTable({ alerts, onAcknowledge, onResolve, onActionType }: AlertsTableProps) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e7ddcf] bg-white/80 p-6 text-center shadow-sm">
        <p className="text-lg font-semibold text-[#2a2927]">No stock alerts</p>
        <p className="mt-2 text-sm text-[#7a6f63]">Create a low stock alert to notify admin.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7ddcf] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-[#f6efe6] text-left text-xs uppercase tracking-[0.2em] text-[#7a6f63]">
          <tr>
            <th className="px-4 py-3">Item</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-t border-[#efe5d8]">
              <td className="px-4 py-3">
                <p className="font-semibold text-[#2a2927]">{alert.item}</p>
                <p className="text-xs text-[#7a6f63]">{alert.reason}</p>
              </td>
              <td className="px-4 py-3">
                {alert.qtyRemaining} {alert.unit}
              </td>
              <td className="px-4 py-3">{alert.severity}</td>
              <td className="px-4 py-3">
                <span className={clsx("rounded-full px-2 py-1 text-xs font-semibold", statusStyles[alert.status])}>
                  {alert.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => onActionType(alert.id, "REFILL")}
                    className="rounded-full border border-[#eadfd1] px-3 py-1 text-[#2a2927] hover:bg-[#f4efe7]"
                  >
                    Request Refill
                  </button>
                  <button
                    onClick={() => onActionType(alert.id, "PURCHASE")}
                    className="rounded-full border border-[#eadfd1] px-3 py-1 text-[#2a2927] hover:bg-[#f4efe7]"
                  >
                    Request Purchase
                  </button>
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-900"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => onResolve(alert.id)}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-900"
                  >
                    Resolve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
