import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, LogOut, Plus, Check } from "lucide-react";
import { FocusTimer } from "./FocusTimer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import type { Habit, HabitCompletion } from "@/types/habits";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const queryClient = useQueryClient();

  // Fetch habits
  const { data: habits = [], isLoading: habitsLoading } = useQuery({
    queryKey: ["habits"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        toast.error("Failed to load habits");
        throw error;
      }
      return data as Habit[];
    },
  });

  // Fetch completions for today
  const { data: completions = [] } = useQuery({
    queryKey: ["habit-completions"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("habit_completions")
        .select("*")
        .gte("completed_at", today.toISOString());
      
      if (error) {
        toast.error("Failed to load completions");
        throw error;
      }
      return data as HabitCompletion[];
    },
  });

  // Create new habit
  const createHabit = useMutation({
    mutationFn: async (name: string) => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from("habits")
        .insert({
          name,
          frequency: "daily",
          user_id: userData.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      setNewHabitName("");
      toast.success("Habit created successfully");
    },
    onError: () => {
      toast.error("Failed to create habit");
    },
  });

  // Toggle habit completion
  const toggleHabit = useMutation({
    mutationFn: async (habitId: string) => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const isCompleted = completions.some(c => c.habit_id === habitId);
      
      if (isCompleted) {
        const { error } = await supabase
          .from("habit_completions")
          .delete()
          .eq("habit_id", habitId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("habit_completions")
          .insert({
            habit_id: habitId,
            user_id: userData.user.id,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habit-completions"] });
    },
    onError: () => {
      toast.error("Failed to update habit");
    },
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowTimer(true)}
              className="bg-accent hover:bg-accent/90"
            >
              <Timer className="mr-2 h-4 w-4" />
              Start Focus Session
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="text-gray-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">Today's Habits</h2>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="New habit name"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button
                  size="sm"
                  onClick={() => createHabit.mutate(newHabitName)}
                  disabled={!newHabitName.trim()}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {habitsLoading ? (
                <p className="text-gray-500">Loading habits...</p>
              ) : habits.length === 0 ? (
                <p className="text-gray-500">No habits created yet</p>
              ) : (
                habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">{habit.name}</span>
                    <Button
                      variant={completions.some(c => c.habit_id === habit.id) ? "default" : "outline"}
                      onClick={() => toggleHabit.mutate(habit.id)}
                      className={completions.some(c => c.habit_id === habit.id) ? "bg-primary" : ""}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {completions.some(c => c.habit_id === habit.id) ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-primary">Weekly Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Habit Completion</span>
                  <span className="text-sm font-medium">
                    {habits.length > 0
                      ? Math.round(
                          (completions.length / habits.length) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    habits.length > 0
                      ? (completions.length / habits.length) * 100
                      : 0
                  }
                  className="h-2"
                />
              </div>
            </div>
          </Card>
        </div>

        {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
      </div>
    </div>
  );
};
