import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HabitWizard } from "./HabitWizard";
import { cn } from "@/lib/utils";

export const HabitList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [expandedHabits, setExpandedHabits] = useState<Set<string>>(new Set());
  const [showWizard, setShowWizard] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | undefined>();
  
  const { habits, habitsLoading, completions, toggleHabit } = useHabits();

  const toggleExpanded = (habitId: string) => {
    const newExpanded = new Set(expandedHabits);
    if (newExpanded.has(habitId)) {
      newExpanded.delete(habitId);
    } else {
      newExpanded.add(habitId);
    }
    setExpandedHabits(newExpanded);
  };

  const parentHabits = habits.filter(h => !h.parent_habit_id);
  const getChildHabits = (parentId: string) => habits.filter(h => h.parent_habit_id === parentId);

  const handleAddSubHabit = (parentId: string) => {
    setSelectedParentId(parentId);
    setShowWizard(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-primary">Habits</h2>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={(value: "daily" | "weekly" | "monthly") => setSelectedPeriod(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily View</SelectItem>
                <SelectItem value="weekly">Weekly View</SelectItem>
                <SelectItem value="monthly">Monthly View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={() => {
            setSelectedParentId(undefined);
            setShowWizard(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Habit
        </Button>
      </div>

      <div className="space-y-3">
        {habitsLoading ? (
          <p className="text-gray-500">Loading habits...</p>
        ) : parentHabits.length === 0 ? (
          <p className="text-gray-500">No habits created yet</p>
        ) : (
          parentHabits
            .filter(habit => habit.frequency === selectedPeriod)
            .map((habit) => (
              <div key={habit.id} className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleExpanded(habit.id)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      {expandedHabits.has(habit.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <span className="text-gray-700 font-medium">{habit.name}</span>
                      {habit.description && (
                        <p className="text-sm text-gray-500">{habit.description}</p>
                      )}
                      {habit.goal_target && (
                        <p className="text-sm text-muted-foreground">
                          Goal: {habit.goal_target} {habit.goal_metric} {habit.goal_period}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddSubHabit(habit.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Step
                    </Button>
                    <Button
                      variant={completions.some(c => c.habit_id === habit.id) ? "default" : "outline"}
                      onClick={() => toggleHabit.mutate(habit.id)}
                      className={cn(
                        completions.some(c => c.habit_id === habit.id) ? "bg-primary" : "",
                        "min-w-[140px]"
                      )}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {completions.some(c => c.habit_id === habit.id) ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                </div>
                
                {expandedHabits.has(habit.id) && (
                  <div className="pl-8 space-y-2">
                    {getChildHabits(habit.id).map((subHabit) => (
                      <div
                        key={subHabit.id}
                        className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-gray-700">{subHabit.name}</span>
                          {subHabit.goal_target && (
                            <p className="text-sm text-muted-foreground">
                              Goal: {subHabit.goal_target} {subHabit.goal_metric} {subHabit.goal_period}
                            </p>
                          )}
                        </div>
                        <Button
                          variant={completions.some(c => c.habit_id === subHabit.id) ? "default" : "outline"}
                          onClick={() => toggleHabit.mutate(subHabit.id)}
                          className={completions.some(c => c.habit_id === subHabit.id) ? "bg-primary" : ""}
                          size="sm"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          {completions.some(c => c.habit_id === subHabit.id) ? "Completed" : "Mark Complete"}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {showWizard && (
        <HabitWizard
          onClose={() => {
            setShowWizard(false);
            setSelectedParentId(undefined);
          }}
          parentHabitId={selectedParentId}
        />
      )}
    </div>
  );
};