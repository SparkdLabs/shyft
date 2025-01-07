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
    <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Track your progress and build better habits</p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onStartTimer}
          className="bg-secondary hover:bg-secondary/90"
          size="lg"
        >
          <Timer className="mr-2 h-5 w-5" />
          Start Focus Session
        </Button>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="text-primary border-primary/20 hover:bg-primary/5"
          size="lg"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};