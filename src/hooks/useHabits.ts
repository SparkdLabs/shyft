import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Habit, HabitCompletion } from "@/types/habits";

interface CreateHabitParams {
  name: string;
  description?: string;
  period?: "daily" | "weekly" | "monthly";
  goalTarget?: number;
  goalMetric?: string;
  parentHabitId?: string;
}

export const useHabits = () => {
  const queryClient = useQueryClient();

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

  const createHabit = useMutation({
    mutationFn: async ({ 
      name, 
      description, 
      period = "daily", 
      goalTarget,
      goalMetric,
      parentHabitId 
    }: CreateHabitParams) => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from("habits")
        .insert({
          name,
          description,
          frequency: period,
          goal_target: goalTarget,
          goal_metric: goalMetric,
          goal_period: period,
          parent_habit_id: parentHabitId,
          user_id: userData.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: () => {
      toast.error("Failed to create habit");
    },
  });

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

  return {
    habits,
    habitsLoading,
    completions,
    createHabit,
    toggleHabit,
  };
};