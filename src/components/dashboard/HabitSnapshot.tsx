import { Card } from "@/components/ui/card";
import { Habit } from "@/types/habits";
import { cn } from "@/lib/utils";
import { Trophy, ArrowRight } from "lucide-react";

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
  const categories = ['Mindfulness', 'Fitness', 'Productivity'];

  return (
    <Card className={cn(
      "p-6 bg-[#1A1F2C] text-white rounded-2xl shadow-sm",
      className
    )}>
      <div className="space-y-6">
        {/* Stats Card */}
        <div className="bg-[#FFE55C]/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3">
              <Trophy className="h-6 w-6 text-[#FFE55C]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">1151</h3>
              <p className="text-gray-300">People tracking habits today</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <h3 className="font-medium text-white mb-2">{category}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">12 habits</span>
                <ArrowRight className="h-5 w-5 text-gray-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Habit Circles */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="text-2xl font-semibold mb-6">Habit Circles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-blue-400">👥</div>
                <h3 className="font-medium">Morning Routines</h3>
              </div>
              <p className="text-gray-300 mb-4">Join 245 others building better morning habits</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors">
                Join Circle
              </button>
            </div>
            <div className="border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-green-400">⭐</div>
                <h3 className="font-medium">Partner Challenge</h3>
              </div>
              <p className="text-gray-300 mb-4">Pair up with a friend for accountability</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors">
                Find Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};