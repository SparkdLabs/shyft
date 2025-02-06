import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FocusTimer } from "./FocusTimer";
import { useHabits } from "@/hooks/useHabits";
import { ProgressCard } from "./habits/ProgressCard";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { HabitSnapshot } from "./dashboard/HabitSnapshot";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import { BottomNav } from "./navigation/BottomNav";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { habits, habitsLoading, completions } = useHabits();

  return (
    <DashboardLayout>
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-20 md:pb-0">
        <HabitSnapshot
          habits={habits}
          completions={completions}
          habitsLoading={habitsLoading}
          className="md:col-span-2"
          onStartTimer={() => setShowTimer(true)}
        />

        <Card className="p-6 bg-white shadow-sm border border-[#edeae9] hover:shadow-md transition-shadow duration-200">
          <ProgressCard />
        </Card>
      </div>

      {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
      <BottomNav />
    </DashboardLayout>
  );
};