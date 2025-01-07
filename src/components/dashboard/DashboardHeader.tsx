import { Button } from "@/components/ui/button";
import { Timer, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardHeaderProps {
  onStartTimer: () => void;
}

export const DashboardHeader = ({ onStartTimer }: DashboardHeaderProps) => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white rounded-xl p-4 md:p-6 shadow-sm space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-sm md:text-base text-muted-foreground">Track your progress and build better habits</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Button
          onClick={onStartTimer}
          className="bg-secondary hover:bg-secondary/90 w-full md:w-auto"
          size="lg"
        >
          <Timer className="mr-2 h-5 w-5" />
          <span className="whitespace-nowrap">Start Focus Session</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="text-primary border-primary/20 hover:bg-primary/5 w-full md:w-auto"
          size="lg"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};