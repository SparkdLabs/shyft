import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HabitList } from "./HabitList";
import { HabitWizard } from "./HabitWizard";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";

export const HabitsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
          <p className="text-muted-foreground">
            Create and track your daily habits to achieve your goals.
          </p>
        </div>

        <PersonalizedRecommendations />
        
        <div className="grid gap-8">
          <HabitWizard />
          <HabitList />
        </div>
      </div>
    </DashboardLayout>
  );
};