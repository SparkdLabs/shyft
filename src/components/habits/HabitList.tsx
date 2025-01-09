import { useState, useEffect } from "react";
import { useHabits } from "@/hooks/useHabits";
import { HabitWizard } from "./HabitWizard";
import { AddStepDialog } from "./AddStepDialog";
import { HabitItem } from "./HabitItem";
import { SubHabitItem } from "./SubHabitItem";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import PullToRefresh from "react-simple-pull-to-refresh";
import { HabitListHeader } from "./HabitListHeader";

export const HabitList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [expandedHabits, setExpandedHabits] = useState<Set<string>>(new Set());
  const [showWizard, setShowWizard] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | undefined>();
  const queryClient = useQueryClient();
  
  const { habits, habitsLoading, completions, toggleHabit } = useHabits();

  // Offline support using localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedCompletions = localStorage.getItem('completions');
    
    if (savedHabits) {
      queryClient.setQueryData(['habits'], JSON.parse(savedHabits));
    }
    if (savedCompletions) {
      queryClient.setQueryData(['habit-completions'], JSON.parse(savedCompletions));
    }
  }, [queryClient]);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (habits) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
    if (completions) {
      localStorage.setItem('completions', JSON.stringify(completions));
    }
  }, [habits, completions]);

  const handleRefresh = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ['habits'] });
      await queryClient.invalidateQueries({ queryKey: ['habit-completions'] });
      toast.success('Habits refreshed');
    } catch (error) {
      toast.error('Failed to refresh habits');
    }
  };

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
    setShowAddStep(true);
  };

  const calculateProgress = (parentId: string) => {
    const subHabits = getChildHabits(parentId);
    if (subHabits.length === 0) return 0;
    
    const completedSubHabits = subHabits.filter(habit => 
      completions.some(completion => completion.habit_id === habit.id)
    ).length;
    
    return (completedSubHabits / subHabits.length) * 100;
  };

  return (
    <div className="space-y-4">
      <HabitListHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        onNewHabit={() => {
          setSelectedParentId(undefined);
          setShowWizard(true);
        }}
      />

      <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
        <div className="space-y-3">
          {habitsLoading ? (
            <p className="text-gray-500">Loading habits...</p>
          ) : parentHabits.length === 0 ? (
            <p className="text-gray-500">No habits created yet</p>
          ) : (
            parentHabits
              .filter(habit => habit.frequency === selectedPeriod)
              .map((habit) => (
                <div key={habit.id}>
                  <HabitItem
                    habit={habit}
                    isExpanded={expandedHabits.has(habit.id)}
                    completions={completions}
                    childHabits={getChildHabits(habit.id)}
                    onToggleExpand={() => toggleExpanded(habit.id)}
                    onAddStep={() => handleAddSubHabit(habit.id)}
                    onToggleComplete={(habitId) => toggleHabit.mutate(habitId)}
                    progress={calculateProgress(habit.id)}
                  />
                  
                  {expandedHabits.has(habit.id) && (
                    <div className="pl-8 space-y-2">
                      {getChildHabits(habit.id).map((subHabit) => (
                        <SubHabitItem
                          key={subHabit.id}
                          subHabit={subHabit}
                          completions={completions}
                          onToggleComplete={(habitId) => toggleHabit.mutate(habitId)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </PullToRefresh>

      {showWizard && (
        <HabitWizard
          onClose={() => {
            setShowWizard(false);
            setSelectedParentId(undefined);
          }}
          parentHabitId={selectedParentId}
        />
      )}

      {showAddStep && selectedParentId && (
        <AddStepDialog
          parentHabitId={selectedParentId}
          onClose={() => {
            setShowAddStep(false);
            setSelectedParentId(undefined);
          }}
        />
      )}
    </div>
  );
};
