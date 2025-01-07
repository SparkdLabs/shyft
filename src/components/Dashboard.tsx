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

      <div className="grid md:grid-cols-3 gap-8">
        <HabitSnapshot
          habits={habits}
          completions={completions}
          habitsLoading={habitsLoading}
        />

        <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
          <ProgressCard />
        </Card>
      </div>

      {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
    </DashboardLayout>
  );
};