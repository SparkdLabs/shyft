import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FocusTimer } from "./FocusTimer";
import { useHabits } from "@/hooks/useHabits";
import { ProgressCard } from "./habits/ProgressCard";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { HabitSnapshot } from "./dashboard/HabitSnapshot";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import { Button } from "./ui/button";
import { Timer } from "lucide-react";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { habits, habitsLoading, completions } = useHabits();

  return (
    <DashboardLayout>
      <DashboardHeader />

      <div className="space-y-6 md:space-y-8">
        <Button
          onClick={() => setShowTimer(true)}
          className="bg-[#796eff] hover:bg-[#635ac7] text-white shadow-sm transition-all duration-200 w-full md:w-auto"
          size="lg"
        >
          <Timer className="mr-2 h-5 w-5" />
          <span className="whitespace-nowrap">Start Focus Session</span>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <HabitSnapshot
            habits={habits}
            completions={completions}
            habitsLoading={habitsLoading}
            className="md:col-span-2"
          />

          <Card className="p-6 shadow-sm border border-[#edeae9] hover:shadow-md transition-shadow duration-200">
            <ProgressCard />
          </Card>
        </div>
      </div>

      {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
    </DashboardLayout>
  );
};