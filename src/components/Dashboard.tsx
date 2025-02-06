import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FocusTimer } from "./FocusTimer";
import { useHabits } from "@/hooks/useHabits";
import { ProgressCard } from "./habits/ProgressCard";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { HabitSnapshot } from "./dashboard/HabitSnapshot";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import { BottomNav } from "./navigation/BottomNav";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { habits, habitsLoading, completions } = useHabits();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">
                Simplify your habits
                <span className="text-blue-400 ml-2">✧</span>
                <span className="text-yellow-400">✦</span>
              </h1>
              <p className="text-gray-600">
                Track your personalized habit journey.
              </p>
            </div>
            <button className="bg-[#1A1F2C] text-white px-6 py-3 rounded-full hover:bg-[#1A1F2C]/90 transition-colors">
              Start tracking →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-20 md:pb-0">
            <HabitSnapshot
              habits={habits}
              completions={completions}
              habitsLoading={habitsLoading}
              className="md:col-span-2"
              onStartTimer={() => setShowTimer(true)}
            />

            <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <ProgressCard />
            </Card>
          </div>
        </div>

        {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
        <BottomNav />
      </div>
    </DashboardLayout>
  );
};