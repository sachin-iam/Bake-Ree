import { timelineEvents } from "@/lib/crm/mockData";

export default function Page() {
  return (
    <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#2a2927]">Timeline</h3>
      <div className="space-y-3">
        {timelineEvents.map((event) => (
          <div
            key={event.time}
            className="flex items-center justify-between rounded-xl border border-[#efe5d8] bg-[#fbf7f1] px-4 py-3 text-sm text-[#4b4a47]"
          >
            <span>{event.note}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
              {event.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
