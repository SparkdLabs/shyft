import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Habit, HabitCompletion } from "@/types/habits";
import { cn } from "@/lib/utils";

interface HabitSnapshotProps {
  habits: Habit[];
  completions: HabitCompletion[];
  habitsLoading: boolean;
  className?: string;
}

export const HabitSnapshot = ({ habits, completions, habitsLoading, className }: HabitSnapshotProps) => {
  const navigate = useNavigate();
  const habitSnapshot = habits.slice(0, 3);
  const completedToday = completions.length;
  const totalHabits = habits.length;

  return (
    <Card className={cn("p-6 shadow-sm border-0 hover:shadow-md transition-shadow duration-200", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Today's Habits</h2>
          <Button
            variant="ghost"
            onClick={() => navigate('/habits')}
            className="text-primary hover:text-primary/80"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {habitsLoading ? (
            <p className="text-muted-foreground">Loading habits...</p>
          ) : habitSnapshot.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">No habits created yet</p>
              <Button onClick={() => navigate('/habits')} className="bg-secondary hover:bg-secondary/90">
                Create Your First Habit
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {completedToday} of {totalHabits} habits completed today
                </p>
                <div className="w-full h-2 bg-muted rounded-full mt-2">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{ 
                      width: `${totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
              {habitSnapshot.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors animate-fadeIn"
                >
                  <span className="text-gray-700">{habit.name}</span>
                  <div className="flex items-center">
                    {completions.some(c => c.habit_id === habit.id) ? (
                      <span className="text-sm font-medium px-3 py-1 bg-secondary/20 text-secondary rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {habits.length > 3 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
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