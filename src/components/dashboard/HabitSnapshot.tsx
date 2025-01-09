import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Habit, HabitCompletion } from "@/types/habits";
import { cn } from "@/lib/utils";

interface HabitSnapshotProps {
  habits: Habit[];
  completions: HabitCompletion[];
  habitsLoading: boolean;
  className?: string;
  onStartTimer: () => void;
}

export const HabitSnapshot = ({ habits, completions, habitsLoading, className, onStartTimer }: HabitSnapshotProps) => {
  const navigate = useNavigate();
  const habitSnapshot = habits.slice(0, 3);
  const completedToday = completions.length;
  const totalHabits = habits.length;

  return (
    <Card className={cn("p-6 shadow-sm border border-[#edeae9] hover:shadow-md transition-shadow duration-200", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#151b26]">Today's Habits</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onStartTimer}
              className="text-[#796eff] hover:text-[#635ac7] hover:bg-[#f6f8f9]"
            >
              <Timer className="mr-1 h-4 w-4" />
              Focus
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/habits')}
              className="text-[#796eff] hover:text-[#635ac7] hover:bg-[#f6f8f9]"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {habitsLoading ? (
            <p className="text-[#6f7782]">Loading habits...</p>
          ) : habitSnapshot.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#6f7782] mb-4">No habits created yet</p>
              <Button onClick={() => navigate('/habits')} className="bg-[#796eff] hover:bg-[#635ac7] text-white">
                Create Your First Habit
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-[#6f7782] mb-2">
                  {completedToday} of {totalHabits} habits completed today
                </p>
                <div className="w-full h-2 bg-[#f6f8f9] rounded-full">
                  <div 
                    className="h-full bg-[#796eff] rounded-full transition-all duration-500"
                    style={{ 
                      width: `${totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
              {habitSnapshot.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-4 bg-[#f6f8f9] rounded-lg hover:bg-[#edeae9] transition-colors animate-fadeIn"
                >
                  <span className="text-[#151b26]">{habit.name}</span>
                  <div className="flex items-center">
                    {completions.some(c => c.habit_id === habit.id) ? (
                      <span className="text-sm font-medium px-3 py-1 bg-[#e5f3e5] text-[#2e7d32] rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="text-sm px-3 py-1 bg-[#f6f8f9] text-[#6f7782] rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {habits.length > 3 && (
                <p className="text-sm text-[#6f7782] text-center mt-4">
                  +{habits.length - 3} more habits
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};