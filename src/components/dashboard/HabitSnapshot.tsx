import { Card } from "@/components/ui/card";
import { Habit } from "@/types/habits";
import { cn } from "@/lib/utils";

interface HabitSnapshotProps {
  habits: Habit[];
  completions: any[];
  habitsLoading: boolean;
  className?: string;
  onStartTimer: () => void;
}

export const HabitSnapshot = ({
  habits,
  completions,
  habitsLoading,
  className,
  onStartTimer
}: HabitSnapshotProps) => {
  return (
    <Card className={cn(
      "p-6 bg-white text-black shadow-sm border border-[#edeae9] hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Today's Habits</h2>
          <button
            onClick={onStartTimer}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Start Timer
          </button>
        </div>

        {habitsLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-100 rounded-md" />
            <div className="h-12 bg-gray-100 rounded-md" />
            <div className="h-12 bg-gray-100 rounded-md" />
          </div>
        ) : habits.length === 0 ? (
          <p className="text-muted-foreground">No habits created yet.</p>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="p-4 rounded-lg border border-[#edeae9] hover:border-primary/20 transition-colors"
              >
                <h3 className="font-medium text-black">{habit.name}</h3>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};