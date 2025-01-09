import { Habit, HabitCompletion } from "@/types/habits";
import { HabitItem } from "./HabitItem";
import { SubHabitItem } from "./SubHabitItem";

interface HabitListContentProps {
  habits: Habit[];
  completions: HabitCompletion[];
  expandedHabits: Set<string>;
  selectedPeriod: "daily" | "weekly" | "monthly";
  onToggleExpand: (habitId: string) => void;
  onToggleComplete: (habitId: string) => void;
  onAddSubHabit: (parentId: string) => void;
}

export const HabitListContent = ({
  habits,
  completions,
  expandedHabits,
  selectedPeriod,
  onToggleExpand,
  onToggleComplete,
  onAddSubHabit,
}: HabitListContentProps) => {
  const parentHabits = habits.filter(h => !h.parent_habit_id);
  const getChildHabits = (parentId: string) => habits.filter(h => h.parent_habit_id === parentId);

  const calculateProgress = (parentId: string) => {
    const subHabits = getChildHabits(parentId);
    if (subHabits.length === 0) return 0;
    
    const completedSubHabits = subHabits.filter(habit => 
      completions.some(completion => completion.habit_id === habit.id)
    ).length;
    
    return (completedSubHabits / subHabits.length) * 100;
  };

  return (
    <div className="space-y-3">
      {parentHabits
        .filter(habit => habit.frequency === selectedPeriod)
        .map((habit) => (
          <div key={habit.id}>
            <HabitItem
              habit={habit}
              isExpanded={expandedHabits.has(habit.id)}
              completions={completions}
              childHabits={getChildHabits(habit.id)}
              onToggleExpand={() => onToggleExpand(habit.id)}
              onAddStep={() => onAddSubHabit(habit.id)}
              onToggleComplete={onToggleComplete}
              progress={calculateProgress(habit.id)}
            />
            
            {expandedHabits.has(habit.id) && (
              <div className="pl-8 space-y-2">
                {getChildHabits(habit.id).map((subHabit) => (
                  <SubHabitItem
                    key={subHabit.id}
                    subHabit={subHabit}
                    completions={completions}
                    onToggleComplete={onToggleComplete}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};