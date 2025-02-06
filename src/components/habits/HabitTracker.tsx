import { Trophy, ArrowRight, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const HabitTracker = () => {
  const categories = ['Mindfulness', 'Fitness', 'Productivity'];

  return (
    <main className="px-6 py-8 animate-fadeIn">
      <Card className="p-8">
        {/* Stats Card */}
        <div className="bg-yellow-50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3">
              <Trophy size={24} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">1151</h3>
              <p className="text-muted-foreground">People tracking habits today</p>
            </div>
          </div>
        </div>

        {/* Habit Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <div 
              key={category} 
              className="bg-secondary rounded-xl p-6 cursor-pointer hover:bg-secondary/80 transition-colors"
            >
              <h3 className="font-semibold mb-2">{category}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">12 habits</span>
                <ArrowRight size={20} className="text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Social Features */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Habit Circles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Users size={24} className="text-blue-500" />
                <h3 className="font-semibold">Morning Routines</h3>
              </div>
              <p className="text-muted-foreground mb-4">Join 245 others building better morning habits</p>
              <Button className="w-full">Join Circle</Button>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Star size={24} className="text-green-500" />
                <h3 className="font-semibold">Partner Challenge</h3>
              </div>
              <p className="text-muted-foreground mb-4">Pair up with a friend for accountability</p>
              <Button className="w-full">Find Partner</Button>
            </Card>
          </div>
        </div>
      </Card>
    </main>
  );
};