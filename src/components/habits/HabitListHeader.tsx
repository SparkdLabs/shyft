import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HabitFilters } from "./HabitFilters";

interface HabitListHeaderProps {
  selectedPeriod: "daily" | "weekly" | "monthly";
  onPeriodChange: (value: "daily" | "weekly" | "monthly") => void;
  onNewHabit: () => void;
}

export const HabitListHeader = ({ selectedPeriod, onPeriodChange, onNewHabit }: HabitListHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-primary">Habits</h2>
        <HabitFilters selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
      </div>
      <Button
        onClick={onNewHabit}
        className="bg-primary hover:bg-primary/90"
      >
        <Plus className="h-4 w-4 mr-1" />
        New Habit
      </Button>
    </div>
  );
};