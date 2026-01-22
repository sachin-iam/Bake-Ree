import CrmSectionShell from "@/components/crm/CrmSectionShell";
import StreakWidget from "@/components/crm/StreakWidget";

export default function Page() {
  return (
    <CrmSectionShell
      title="Streaks & Milestones"
      subtitle="Loyalty & Rewards"
      description="Weekly streak tracking with milestone rewards at 4/8/12 weeks."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <StreakWidget current={5} best={12} nextMilestone={8} />
        <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-[#4b4a47] shadow-sm">
          Milestones trigger automated rewards and staff tasks. Configure cooldowns
          and reward types per tier.
        </div>
      </section>
    </CrmSectionShell>
  );
}
