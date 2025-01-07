import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer } from "lucide-react";
import { FocusTimer } from "./FocusTimer";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const habits = [
    { id: 1, name: "Morning Priority Planning", completed: false },
    { id: 2, name: "Learning Session", completed: false },
    { id: 3, name: "Network Connection", completed: false },
  ];

  const [completedHabits, setCompletedHabits] = useState<number[]>([]);

  const toggleHabit = (id: number) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
          <Button
            onClick={() => setShowTimer(true)}
            className="bg-accent hover:bg-accent/90"
          >
            <Timer className="mr-2 h-4 w-4" />
            Start Focus Session
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-primary">Today's Habits</h2>
            <div className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">{habit.name}</span>
                  <Button
                    variant={completedHabits.includes(habit.id) ? "default" : "outline"}
                    onClick={() => toggleHabit(habit.id)}
                    className={completedHabits.includes(habit.id) ? "bg-primary" : ""}
                  >
                    {completedHabits.includes(habit.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-primary">Weekly Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Habit Completion</span>
                  <span className="text-sm font-medium">
                    {Math.round((completedHabits.length / habits.length) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(completedHabits.length / habits.length) * 100}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Focus Time</span>
                  <span className="text-sm font-medium">2.5 hrs</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
      </div>
    </div>
  );
};