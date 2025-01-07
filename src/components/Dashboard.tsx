import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, LogOut } from "lucide-react";
import { FocusTimer } from "./FocusTimer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { HabitList } from "./habits/HabitList";
import { ProgressCard } from "./habits/ProgressCard";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AchievementCard } from "./achievements/AchievementCard";
import { PersonalizedRecommendations } from "./habits/PersonalizedRecommendations";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-gradient-to-b from-muted to-white p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">Track your progress and build better habits</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowTimer(true)}
                  className="bg-secondary hover:bg-secondary/90"
                  size="lg"
                >
                  <Timer className="mr-2 h-5 w-5" />
                  Start Focus Session
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="text-primary border-primary/20 hover:bg-primary/5"
                  size="lg"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200 md:col-span-2">
                <HabitList />
              </Card>

              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
                <ProgressCard />
              </Card>

              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200 md:col-span-2">
                <PersonalizedRecommendations />
              </Card>

              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200 md:col-span-3">
                <AchievementCard />
              </Card>
            </div>

            {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};