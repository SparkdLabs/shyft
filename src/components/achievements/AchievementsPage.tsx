import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Award, Trophy, Star, Medal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AchievementsPage = () => {
  const { data: achievements, isLoading: achievementsLoading } = useQuery({
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
        .select("achievement_id, unlocked_at");

      if (userAchievementsError) {
        toast.error("Failed to load user achievements");
        throw userAchievementsError;
      }

      const unlockedMap = new Map(
        userAchievements.map(ua => [ua.achievement_id, ua.unlocked_at])
      );
      
      return allAchievements.map(achievement => ({
        ...achievement,
        unlocked: unlockedMap.has(achievement.id),
        unlockedAt: unlockedMap.get(achievement.id)
      }));
    },
  });

  const { data: focusSessions } = useQuery({
    queryKey: ["focus_sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("focus_sessions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load focus sessions");
        throw error;
      }

      return data;
    },
  });

  const { data: habitCompletions } = useQuery({
    queryKey: ["habit_completions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("habit_completions")
        .select("*")
        .order("completed_at", { ascending: false });

      if (error) {
        toast.error("Failed to load habit completions");
        throw error;
      }

      return data;
    },
  });

  const totalPoints = achievements?.reduce((sum, achievement) => 
    achievement.unlocked ? sum + achievement.points : sum, 0) || 0;

  const maxPoints = achievements?.reduce((sum, achievement) => 
    sum + achievement.points, 0) || 0;

  const progressPercentage = (totalPoints / maxPoints) * 100;

  const categoryProgress = achievements?.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = {
        category: achievement.category,
        total: 0,
        unlocked: 0,
        points: 0,
        maxPoints: 0,
      };
    }
    acc[achievement.category].total += 1;
    acc[achievement.category].maxPoints += achievement.points;
    if (achievement.unlocked) {
      acc[achievement.category].unlocked += 1;
      acc[achievement.category].points += achievement.points;
    }
    return acc;
  }, {} as Record<string, { category: string; total: number; unlocked: number; points: number; maxPoints: number; }>);

  const chartData = Object.values(categoryProgress || {}).map(cat => ({
    name: cat.category,
    completed: cat.unlocked,
    total: cat.total,
    progress: Math.round((cat.points / cat.maxPoints) * 100),
  }));

  const getAchievementIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'focus':
        return Medal;
      case 'habits':
        return Star;
      case 'streaks':
        return Trophy;
      default:
        return Award;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-gradient-to-b from-muted to-white p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-primary mb-2">Achievements</h1>
                  <p className="text-muted-foreground">Track your progress and unlock rewards</p>
                </div>
                <Trophy className="h-12 w-12 text-secondary" />
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <span className="text-lg font-semibold text-primary">
                    {totalPoints} / {maxPoints} points
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-primary mb-6">Progress by Category</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="progress" fill="#9b87f5" name="Progress %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-primary mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {focusSessions?.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Medal className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium">Completed Focus Session</p>
                        <p className="text-sm text-muted-foreground">
                          {session.duration_minutes} minutes
                        </p>
                      </div>
                    </div>
                  ))}
                  {habitCompletions?.slice(0, 3).map((completion) => (
                    <div key={completion.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Star className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium">Habit Completed</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(completion.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-6">All Achievements</h2>
              <div className="grid gap-4">
                {achievementsLoading ? (
                  <p className="text-muted-foreground">Loading achievements...</p>
                ) : (
                  achievements?.map((achievement) => {
                    const Icon = getAchievementIcon(achievement.category);
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                          achievement.unlocked
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted border border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
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
                            {achievement.unlocked && (
                              <p className="text-xs text-primary mt-1">
                                Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </p>
                            )}
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
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};