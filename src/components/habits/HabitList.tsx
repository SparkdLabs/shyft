import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";

export const HabitList = () => {
  const [newHabitName, setNewHabitName] = useState("");
  const { habits, habitsLoading, completions, createHabit, toggleHabit } = useHabits();

  return (
    <div className="space-y-4">
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
            onClick={() => {
              createHabit.mutate(newHabitName);
              setNewHabitName("");
            }}
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
    </div>
  );
};