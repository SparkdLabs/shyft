import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HABIT_TEMPLATES = {
  promotion: {
    technology: [
      { name: "Code Review", description: "Review or contribute to a coding project" },
      { name: "Tech Reading", description: "Read industry news or technical documentation" },
      { name: "Skill Development", description: "Practice a new programming language or tool" }
    ],
    finance: [
      { name: "Market Analysis", description: "Review financial markets and trends" },
      { name: "Network Building", description: "Connect with industry professionals" },
      { name: "Financial Learning", description: "Study new financial instruments or strategies" }
    ],
    default: [
      { name: "Skill Development", description: "Learn something new in your field" },
      { name: "Network Building", description: "Connect with industry professionals" },
      { name: "Industry Research", description: "Stay updated with industry trends" }
    ]
  },
  skills: {
    technology: [
      { name: "Daily Coding", description: "Practice coding for 30 minutes" },
      { name: "Documentation", description: "Write or review technical documentation" },
      { name: "Learning Time", description: "Watch an educational tech video" }
    ],
    finance: [
      { name: "Financial Analysis", description: "Practice financial modeling" },
      { name: "Industry Research", description: "Read financial reports and analysis" },
      { name: "Certification Study", description: "Study for financial certifications" }
    ],
    default: [
      { name: "Daily Learning", description: "Dedicate time to learning new skills" },
      { name: "Practice Session", description: "Practice core skills in your field" },
      { name: "Research Time", description: "Research industry best practices" }
    ]
  },
  default: [
    { name: "Professional Development", description: "Work on career growth activities" },
    { name: "Networking", description: "Build professional relationships" },
    { name: "Learning", description: "Develop new skills" }
  ]
};

export const PersonalizedRecommendations = () => {
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
      return data || { career_goal: 'default', industry: 'default' }; // Provide default values if no preferences exist
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
    const careerGoal = preferences?.career_goal || "default";
    const industry = preferences?.industry?.toLowerCase() || "default";
    
    const templates = HABIT_TEMPLATES[careerGoal as keyof typeof HABIT_TEMPLATES] || HABIT_TEMPLATES.default;
    return typeof templates === "object" && !Array.isArray(templates)
      ? templates[industry as keyof typeof templates] || templates.default
      : templates;
  };

  const recommendedHabits = getRecommendedHabits();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Recommended Habits</h2>
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <Brain className="h-5 w-5 text-primary" />
        </div>
      </div>
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
    </div>
  );
};