import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HabitList } from "./HabitList";
import { HabitWizard } from "./HabitWizard";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const HabitsPage = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
            <p className="text-muted-foreground">
              Create and track your daily habits to achieve your goals.
            </p>
          </div>
          <Button onClick={() => setShowWizard(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Habit
          </Button>
        </div>

        <PersonalizedRecommendations />
        
        <div className="grid gap-8">
          {showWizard && <HabitWizard onClose={() => setShowWizard(false)} />}
          <HabitList />
        </div>
      </div>
    </DashboardLayout>
  );
};