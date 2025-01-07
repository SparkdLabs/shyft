import { Award, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AchievementCard = () => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data: allAchievements, error: achievementsError } = await supabase
        .from("achievements")
        .select("*");

      if (achievementsError) {
        toast.error("Failed to load achievements");
        throw achievementsError;
      }

      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from("user_achievements")
        .select("achievement_id");

      if (userAchievementsError) {
        toast.error("Failed to load user achievements");
        throw userAchievementsError;
      }

      const unlockedIds = new Set(userAchievements.map(ua => ua.achievement_id));
      
      return allAchievements.map(achievement => ({
        ...achievement,
        unlocked: unlockedIds.has(achievement.id)
      }));
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Achievements</h2>
        <Trophy className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground">Loading achievements...</p>
        ) : !achievements?.length ? (
          <p className="text-muted-foreground">No achievements available</p>
        ) : (
          achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                achievement.unlocked
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-secondary/50 border border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <Award
                  className={`h-5 w-5 ${
                    achievement.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <div>
                  <h3 className={`font-medium ${
                    achievement.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  achievement.unlocked ? "text-primary" : "text-muted-foreground"
                }`}>
                  {achievement.points} pts
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};