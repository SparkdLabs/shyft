import { Progress } from "@/components/ui/progress";
import { useHabits } from "@/hooks/useHabits";

export const ProgressCard = () => {
  const { habits, completions } = useHabits();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-primary">Weekly Progress</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Habit Completion</span>
            <span className="text-sm font-medium">
              {habits.length > 0
                ? Math.round((completions.length / habits.length) * 100)
                : 0}
              %
            </span>
          </div>
          <Progress
            value={
              habits.length > 0
                ? (completions.length / habits.length) * 100
                : 0
            }
            className="h-2"
          />
        </div>
      </div>
    </div>
  );
};