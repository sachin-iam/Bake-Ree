const notes = [
  { title: "Follow-up call", owner: "Priya", due: "Jan 24" },
  { title: "Send tier upgrade offer", owner: "Rahul", due: "Jan 26" },
];

export default function Page() {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#2a2927]">Notes & Tasks</h3>
        <button className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#2a2927]">
          Add task
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {notes.map((note) => (
          <div
            key={note.title}
            className="flex items-center justify-between rounded-xl border border-[#efe5d8] bg-[#fbf7f1] px-4 py-3 text-sm text-[#4b4a47]"
          >
            <span>{note.title}</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8b867f]">
              {note.owner} · {note.due}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
