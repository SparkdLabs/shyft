import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HabitList } from "./HabitList";
import { HabitWizard } from "./HabitWizard";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";

export const HabitsPage = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <div className="px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Habits</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Create and track your daily habits to achieve your goals.
          </p>
        </div>

        <PersonalizedRecommendations />
        
        <div className="grid gap-6 md:gap-8">
          {showWizard && <HabitWizard onClose={() => setShowWizard(false)} />}
          <HabitList />
        </div>
      </div>
    </DashboardLayout>
  );
};