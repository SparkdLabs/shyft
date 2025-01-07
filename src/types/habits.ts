export type Habit = {
  id: string;
  name: string;
  description: string | null;
  frequency: "daily" | "weekly" | "monthly";
  created_at: string;
  updated_at: string;
  user_id: string;
  goal_target: number | null;
  goal_period: "daily" | "weekly" | "monthly" | null;
  goal_metric: string | null;
};

export type HabitCompletion = {
  id: string;
  habit_id: string;
  completed_at: string;
  user_id: string;
};