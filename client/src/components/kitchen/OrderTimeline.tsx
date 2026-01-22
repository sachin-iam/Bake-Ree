import clsx from "clsx";
import type { KitchenOrderStatus } from "@/store/kitchenStore";

const timeline = ["READY", "HANDOFF_REQUESTED", "DISPATCH_ASSIGNED"] as const;

const timelineLabels: Record<(typeof timeline)[number], string> = {
  READY: "Ready",
  HANDOFF_REQUESTED: "Handoff",
  DISPATCH_ASSIGNED: "Assigned",
};

type OrderTimelineProps = {
  status: KitchenOrderStatus;
};

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = timeline.indexOf(status as (typeof timeline)[number]);
  const resolvedIndex = status === "COMPLETED" ? timeline.length - 1 : currentIndex;

  return (
    <div className="mt-4 flex items-center gap-3 text-[10px] text-[#7a6f63]">
      {timeline.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full",
              index <= resolvedIndex ? "bg-emerald-500" : "bg-[#d7cab8]"
            )}
          />
          <span className={clsx(index <= resolvedIndex ? "text-[#2a2927]" : "text-[#9b8d7f]")}>
            {timelineLabels[step]}
          </span>
          {index < timeline.length - 1 && <span className="text-[#c4b8a8]">→</span>}
        </div>
      ))}
    </div>
  );
}
