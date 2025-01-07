import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const HabitList = () => {
  const [newHabitName, setNewHabitName] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const { habits, habitsLoading, completions, createHabit, toggleHabit } = useHabits();

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
        <div className="flex gap-2 items-center">
          <Input
            placeholder="New habit name"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="max-w-[200px]"
          />
          <Button
            size="sm"
            onClick={() => {
              createHabit.mutate({ 
                name: newHabitName,
                period: selectedPeriod
              });
              setNewHabitName("");
            }}
            disabled={!newHabitName.trim()}
          >
            <Plus className="h-4 w-4 mr-1" />
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
          habits
            .filter(habit => habit.frequency === selectedPeriod)
            .map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-gray-700 font-medium">{habit.name}</span>
                  {habit.goal_target && (
                    <p className="text-sm text-muted-foreground">
                      Goal: {habit.goal_target} {habit.goal_metric} {habit.goal_period}
                    </p>
                  )}
                </div>
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
    </div>
  );
};