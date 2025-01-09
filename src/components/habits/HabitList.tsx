import { useState, useEffect } from "react";
import { useHabits } from "@/hooks/useHabits";
import { HabitWizard } from "./HabitWizard";
import { AddStepDialog } from "./AddStepDialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import PullToRefresh from "react-simple-pull-to-refresh";
import { HabitListHeader } from "./HabitListHeader";
import { HabitListContent } from "./HabitListContent";

export const HabitList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [expandedHabits, setExpandedHabits] = useState<Set<string>>(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('expandedHabits');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showWizard, setShowWizard] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | undefined>();
  const queryClient = useQueryClient();
  
  const { habits, habitsLoading, completions, toggleHabit } = useHabits();

  // Save expanded habits to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expandedHabits', JSON.stringify(Array.from(expandedHabits)));
  }, [expandedHabits]);

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

  const handleAddSubHabit = (parentId: string) => {
    setSelectedParentId(parentId);
    setShowAddStep(true);
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
        {habitsLoading ? (
          <p className="text-gray-500">Loading habits...</p>
        ) : habits.length === 0 ? (
          <p className="text-gray-500">No habits created yet</p>
        ) : (
          <HabitListContent
            habits={habits}
            completions={completions}
            expandedHabits={expandedHabits}
            selectedPeriod={selectedPeriod}
            onToggleExpand={toggleExpanded}
            onToggleComplete={(habitId) => toggleHabit.mutate(habitId)}
            onAddSubHabit={handleAddSubHabit}
          />
        )}
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