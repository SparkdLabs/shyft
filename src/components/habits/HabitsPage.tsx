import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HabitList } from "./HabitList";
import { ProgressCard } from "./ProgressCard";
import { HabitWizard } from "./HabitWizard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const HabitsPage = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-gradient-to-b from-muted to-white p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">Habits</h1>
                <p className="text-muted-foreground">Track and build better habits</p>
              </div>
              <Button
                onClick={() => setShowWizard(true)}
                className="bg-secondary hover:bg-secondary/90"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Habit
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200 md:col-span-2">
                <HabitList />
              </Card>

              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
                <ProgressCard />
              </Card>
            </div>

            {showWizard && <HabitWizard onClose={() => setShowWizard(false)} />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};