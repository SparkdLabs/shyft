import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Habit, HabitCompletion } from "@/types/habits";

interface SubHabitItemProps {
  subHabit: Habit;
  completions: HabitCompletion[];
  onToggleComplete: (habitId: string) => void;
}

export const SubHabitItem = ({
  subHabit,
  completions,
  onToggleComplete,
}: SubHabitItemProps) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors"
    >
      <div className="space-y-1">
        <span className="text-gray-700">{subHabit.name}</span>
      </div>
      <Button
        variant={completions.some(c => c.habit_id === subHabit.id) ? "default" : "outline"}
        onClick={() => onToggleComplete(subHabit.id)}
        className={completions.some(c => c.habit_id === subHabit.id) ? "bg-primary" : ""}
        size="sm"
      >
        <Check className="mr-2 h-4 w-4" />
        {completions.some(c => c.habit_id === subHabit.id) ? "Completed" : "Mark Complete"}
      </Button>
    </div>
  );
};