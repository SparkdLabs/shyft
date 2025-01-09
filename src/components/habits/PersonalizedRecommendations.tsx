import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Star, Target, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const HABIT_TEMPLATES = {
  health: [
    { name: "Daily Exercise", description: "Stay active with regular physical activity" },
    { name: "Healthy Eating", description: "Make nutritious food choices" },
    { name: "Sleep Schedule", description: "Maintain consistent sleep patterns" }
  ],
  personal: [
    { name: "Meditation", description: "Practice mindfulness daily" },
    { name: "Reading", description: "Read for personal growth" },
    { name: "Journaling", description: "Record thoughts and reflections" }
  ],
  relationships: [
    { name: "Family Time", description: "Spend quality time with family" },
    { name: "Friend Check-in", description: "Stay connected with friends" },
    { name: "Active Listening", description: "Practice being present in conversations" }
  ],
  productivity: [
    { name: "Morning Routine", description: "Start your day with purpose" },
    { name: "Task Planning", description: "Organize daily priorities" },
    { name: "Focus Sessions", description: "Work without distractions" }
  ],
  learning: [
    { name: "Skill Practice", description: "Dedicate time to learning new skills" },
    { name: "Online Course", description: "Progress in educational content" },
    { name: "Knowledge Sharing", description: "Teach others what you know" }
  ],
  default: [
    { name: "Daily Reflection", description: "Review your day and set intentions" },
    { name: "Goal Progress", description: "Track steps toward your goals" },
    { name: "Habit Building", description: "Develop positive routines" }
  ]
};

export const PersonalizedRecommendations = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const { data: preferences, isLoading, error } = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data || { focus_areas: [], preferred_habit_categories: [] };
    }
  });

  const createHabit = async (name: string, description: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("habits")
        .insert({
          name,
          description,
          user_id: user.id,
        });

      if (error) throw error;
      toast.success("Habit template added to your list");
    } catch (error) {
      toast.error("Failed to add habit template");
    }
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Loading recommendations...</div>;
  }

  if (error) {
    console.error("Error fetching preferences:", error);
    return <div className="text-muted-foreground">Unable to load recommendations. Please try again later.</div>;
  }

  const getRecommendedHabits = () => {
    const focusAreas = preferences?.focus_areas || [];
    const recommendedHabits: Array<{ name: string; description: string }> = [];
    
    focusAreas.forEach(area => {
      const areaKey = area.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof HABIT_TEMPLATES;
      const templates = HABIT_TEMPLATES[areaKey] || [];
      recommendedHabits.push(...templates.slice(0, 2));
    });

    if (recommendedHabits.length < 3) {
      recommendedHabits.push(...HABIT_TEMPLATES.default);
    }

    return recommendedHabits.slice(0, 6);
  };

  const recommendedHabits = getRecommendedHabits();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-primary">Recommended Habits</h2>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <Target className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-transparent">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-primary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-primary" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-4">
        <div className="grid gap-4">
          {recommendedHabits.map((habit, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border hover:bg-secondary/70 transition-colors"
            >
              <div>
                <h3 className="font-medium text-primary">{habit.name}</h3>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => createHabit(habit.name, habit.description)}
                className="ml-4"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};