type StreakWidgetProps = {
  current: number;
  best: number;
  nextMilestone: number;
};

export default function StreakWidget({ current, best, nextMilestone }: StreakWidgetProps) {
  const progress = Math.min((current / nextMilestone) * 100, 100);
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#2a2927]">Streaks & milestones</h3>
          <p className="mt-1 text-xs text-[#8b867f]">
            Weekly ordering streak with milestone rewards.
          </p>
        </div>
        <span className="rounded-full bg-[#f7f5f0] px-3 py-1 text-xs font-semibold text-[#4b4a47]">
          Best: {best} weeks
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-[#8b867f]">
          <span>Current: {current} weeks</span>
          <span>Next reward at {nextMilestone} weeks</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-[#f0ede7]">
          <div
            className="h-2 rounded-full bg-[#1f7a6b]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
