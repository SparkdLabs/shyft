import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Habit, HabitCompletion } from "@/types/habits";
import { SwipeableHabitContainer } from "./habit-item/SwipeableHabitContainer";
import { HabitProgress } from "./habit-item/HabitProgress";
import { DeleteHabitDialog } from "./habit-item/DeleteHabitDialog";
import { HabitActions } from "./habit-item/HabitActions";

interface HabitItemProps {
  habit: Habit;
  isExpanded: boolean;
  completions: HabitCompletion[];
  childHabits: Habit[];
  onToggleExpand: () => void;
  onAddStep: () => void;
  onToggleComplete: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  progress: number;
}

export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  isExpanded,
  completions,
  onToggleExpand,
  onAddStep,
  onToggleComplete,
  onDelete,
  progress,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="space-y-2">
      <SwipeableHabitContainer
        onSwipeLeft={() => setShowDeleteDialog(true)}
        onSwipeRight={() => onToggleComplete(habit.id)}
      >
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
          
          <HabitActions
            habitId={habit.id}
            completions={completions}
            onAddStep={onAddStep}
            onDelete={() => setShowDeleteDialog(true)}
            onToggleComplete={onToggleComplete}
          />
        </div>
        
        <HabitProgress progress={progress} />
      </SwipeableHabitContainer>

      <DeleteHabitDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={() => {
          onDelete(habit.id);
          setShowDeleteDialog(false);
        }}
      />
    </div>
  );
};