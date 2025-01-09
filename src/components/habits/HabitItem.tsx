import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Habit, HabitCompletion } from "@/types/habits";

interface HabitItemProps {
  habit: Habit;
  isExpanded: boolean;
  completions: HabitCompletion[];
  childHabits: Habit[];
  onToggleExpand: () => void;
  onAddStep: () => void;
  onToggleComplete: (habitId: string) => void;
  progress: number;
}

export const HabitItem = ({
  habit,
  isExpanded,
  completions,
  childHabits,
  onToggleExpand,
  onAddStep,
  onToggleComplete,
  progress,
}: HabitItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 flex-1">
            <button
              onClick={onToggleExpand}
              className="p-2 -m-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <div className="space-y-1 flex-1">
              <span className="text-gray-900 font-medium block">{habit.name}</span>
              {habit.description && (
                <p className="text-sm text-gray-500">{habit.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onAddStep}
              className="hidden md:flex"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
            <Button
              variant={completions.some(c => c.habit_id === habit.id) ? "default" : "outline"}
              onClick={() => onToggleComplete(habit.id)}
              className={cn(
                "min-w-[44px] md:min-w-[140px] h-[44px]",
                completions.some(c => c.habit_id === habit.id) ? "bg-primary" : ""
              )}
            >
              <Check className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">
                {completions.some(c => c.habit_id === habit.id) ? "Completed" : "Mark Complete"}
              </span>
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
};