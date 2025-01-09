import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HabitCompletion } from "@/types/habits";

interface HabitActionsProps {
  habitId: string;
  completions: HabitCompletion[];
  onAddStep: () => void;
  onDelete: () => void;
  onToggleComplete: (habitId: string) => void;
}

export const HabitActions: React.FC<HabitActionsProps> = ({
  habitId,
  completions,
  onAddStep,
  onDelete,
  onToggleComplete,
}) => {
  const isCompleted = completions.some(c => c.habit_id === habitId);

  return (
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
        variant="outline"
        size="sm"
        onClick={onDelete}
        className="hidden md:flex text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>
      <Button
        variant={isCompleted ? "default" : "outline"}
        onClick={() => onToggleComplete(habitId)}
        className={cn(
          "min-w-[44px] md:min-w-[140px] h-[44px]",
          isCompleted ? "bg-primary" : ""
        )}
      >
        <Check className="h-5 w-5 md:mr-2" />
        <span className="hidden md:inline">
          {isCompleted ? "Completed" : "Mark Complete"}
        </span>
      </Button>
    </div>
  );
};