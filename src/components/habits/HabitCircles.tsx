import { useState } from "react";
import { Users, Trophy, Target, Plus, ArrowRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Circle {
  id: number;
  name: string;
  category: string;
  members: number;
  streak: number;
  description: string;
  habits: string[];
  activity: "high" | "medium" | "low";
}

export const HabitCircles = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const circles: Circle[] = [
    {
      id: 1,
      name: "Morning Champions",
      category: "morning",
      members: 245,
      streak: 15,
      description: "Build a powerful morning routine together",
      habits: ["5AM Wake-up", "Meditation", "Exercise"],
      activity: "high"
    },
    {
      id: 2,
      name: "Mindfulness Masters",
      category: "mindfulness",
      members: 189,
      streak: 22,
      description: "Daily meditation and mindfulness practices",
      habits: ["Meditation", "Journaling", "Gratitude"],
      activity: "medium"
    },
    {
      id: 3,
      name: "Productivity Pros",
      category: "productivity",
      members: 312,
      streak: 8,
      description: "Boost your daily productivity habits",
      habits: ["Time Blocking", "Deep Work", "Planning"],
      activity: "high"
    }
  ];

  const getActivityColor = (activity: Circle["activity"]) => {
    const colors = {
      high: "bg-green-400",
      medium: "bg-yellow-400",
      low: "bg-gray-400"
    };
    return colors[activity];
  };

  return (
    <div className="p-6 animate-fadeIn">
      <Card className="bg-blue-50 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Circles</h2>
            <p className="text-muted-foreground">Join others in building better habits</p>
          </div>
          <Button className="mt-4 md:mt-0">
            Create Circle <Plus className="ml-2" size={20} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Users size={24} className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">746</h3>
              <p className="text-muted-foreground">Active Members</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="bg-yellow-100 rounded-full p-3">
              <Trophy size={24} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">15</h3>
              <p className="text-muted-foreground">Day Streak</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="bg-green-100 rounded-full p-3">
              <Target size={24} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">89%</h3>
              <p className="text-muted-foreground">Completion Rate</p>
            </div>
          </Card>
        </div>
      </Card>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {["All", "Morning", "Mindfulness", "Productivity", "Fitness"].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.toLowerCase())}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {circles.map((circle) => (
          <Card key={circle.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">{circle.name}</h3>
                <p className="text-muted-foreground">{circle.description}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getActivityColor(circle.activity)}`} />
            </div>
            
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <span className="text-sm text-muted-foreground">{circle.members} members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-gray-400" />
                <span className="text-sm text-muted-foreground">{circle.streak} day streak</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {circle.habits.map((habit) => (
                <span key={habit} className="bg-secondary px-3 py-1 rounded-full text-sm text-muted-foreground">
                  {habit}
                </span>
              ))}
            </div>

            <Button className="w-full">
              Join Circle <ArrowRight className="ml-2" size={20} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};