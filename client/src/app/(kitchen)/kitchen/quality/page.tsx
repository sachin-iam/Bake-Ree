"use client";

import KitchenHeader from "@/components/kitchen/KitchenHeader";
import { useKitchenStore } from "@/store/kitchenStore";
import toast from "react-hot-toast";

export default function QualityPage() {
  const { sendPing } = useKitchenStore();

  return (
    <div>
      <KitchenHeader
        title="Quality & Waste"
        subtitle="QC Control"
        description="Log waste, QC checks, and hygiene compliance."
        isLive
      />

      <div className="w-full py-6 space-y-6">
        <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a2927]">Waste log</h3>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.2em] text-[#7a6f63]">
              <tr>
                <th className="py-2">Item</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Reason</th>
                <th className="py-2">Logged by</th>
              </tr>
            </thead>
            <tbody className="text-[#2a2927]">
              <tr className="border-t border-[#efe5d8]">
                <td className="py-3">Croissant batch</td>
                <td className="py-3">12</td>
                <td className="py-3">Overbaked</td>
                <td className="py-3">Jade</td>
              </tr>
              <tr className="border-t border-[#efe5d8]">
                <td className="py-3">Vanilla eclairs</td>
                <td className="py-3">4</td>
                <td className="py-3">Packaging defect</td>
                <td className="py-3">Omari</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">QC checks</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#7a6f63]">
              <li>• Sourdough crumb check — Pass</li>
              <li>• Brioche texture — Pass</li>
              <li>• Frosting consistency — Fail (needs admin)</li>
            </ul>
            <button
              onClick={() => {
                sendPing({
                  body: "QC fail flagged: frosting consistency",
                  targetRole: "ADMIN",
                  template: "QC fail",
                });
                toast.success("QC fail sent to admin");
              }}
              className="mt-4 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900"
            >
              Escalate QC fail
            </button>
          </div>
          <div className="rounded-2xl border border-[#e7ddcf] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2927]">Hygiene checklist</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#7a6f63]">
              <li>• Handwash stations stocked</li>
              <li>• Surface sanitization complete</li>
              <li>• Temperature logs updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
