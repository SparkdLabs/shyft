import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HabitList } from "./HabitList";
import { HabitWizard } from "./HabitWizard";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";
import { HabitFAB } from "./HabitFAB";
import { BottomNav } from "@/components/navigation/BottomNav";

export const HabitsPage = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8 pb-20 md:pb-0">
        <div className="px-4 md:px-0 mt-14 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Habits
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Create and track your daily habits to achieve your goals.
          </p>
        </div>

        <PersonalizedRecommendations />
        
        <div className="grid gap-6 md:gap-8">
          {showWizard && <HabitWizard onClose={() => setShowWizard(false)} />}
          <HabitList />
        </div>
      </div>
      
      <HabitFAB onClick={() => setShowWizard(true)} />
      <BottomNav />
    </DashboardLayout>
  );
};