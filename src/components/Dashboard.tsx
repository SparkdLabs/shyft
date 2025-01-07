import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FocusTimer } from "./FocusTimer";
import { useHabits } from "@/hooks/useHabits";
import { ProgressCard } from "./habits/ProgressCard";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { HabitSnapshot } from "./dashboard/HabitSnapshot";
import { DashboardLayout } from "./dashboard/DashboardLayout";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { habits, habitsLoading, completions } = useHabits();

  return (
    <DashboardLayout>
      <DashboardHeader onStartTimer={() => setShowTimer(true)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <HabitSnapshot
          habits={habits}
          completions={completions}
          habitsLoading={habitsLoading}
          className="md:col-span-2"
        />

        <Card className="p-4 md:p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
          <ProgressCard />
        </Card>
      </div>

      {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
    </DashboardLayout>
  );
};