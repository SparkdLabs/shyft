import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, LogOut, ArrowRight } from "lucide-react";
import { FocusTimer } from "./FocusTimer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useHabits } from "@/hooks/useHabits";
import { ProgressCard } from "./habits/ProgressCard";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AchievementCard } from "./achievements/AchievementCard";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const navigate = useNavigate();
  const { habits, habitsLoading, completions } = useHabits();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    }
  };

  // Get only the first 3 habits for the snapshot
  const habitSnapshot = habits.slice(0, 3);
  const completedToday = completions.length;
  const totalHabits = habits.length;

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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-primary">Today's Habits</h2>
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/habits')}
                      className="text-primary hover:text-primary/80"
                    >
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {habitsLoading ? (
                      <p className="text-muted-foreground">Loading habits...</p>
                    ) : habitSnapshot.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No habits created yet</p>
                        <Button onClick={() => navigate('/habits')}>
                          Create Your First Habit
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">
                            {completedToday} of {totalHabits} habits completed today
                          </p>
                        </div>
                        {habitSnapshot.map((habit) => (
                          <div
                            key={habit.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-gray-700">{habit.name}</span>
                            <div className="flex items-center">
                              {completions.some(c => c.habit_id === habit.id) ? (
                                <span className="text-sm text-primary font-medium">
                                  Completed
                                </span>
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  Pending
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        {habits.length > 3 && (
                          <p className="text-sm text-muted-foreground text-center mt-4">
                            +{habits.length - 3} more habits
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
                <ProgressCard />
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