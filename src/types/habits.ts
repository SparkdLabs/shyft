export type Habit = {
  id: string;
  name: string;
  description: string | null;
  frequency: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type HabitCompletion = {
  id: string;
  habit_id: string;
  completed_at: string;
  user_id: string;
};