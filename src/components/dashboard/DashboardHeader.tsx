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
    <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white rounded-xl p-4 md:p-8 shadow-sm border border-[#edeae9] space-y-4 md:space-y-0 mt-14 md:mt-0">
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-[#151b26] mb-1">Welcome Back</h1>
        <p className="text-sm md:text-base text-[#6f7782]">Track your progress and build better habits</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Button
          onClick={onStartTimer}
          className="bg-[#796eff] hover:bg-[#635ac7] text-white shadow-sm transition-all duration-200 w-full md:w-auto"
          size="lg"
        >
          <Timer className="mr-2 h-5 w-5" />
          <span className="whitespace-nowrap">Start Focus Session</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="text-[#6f7782] border-[#edeae9] hover:bg-[#f6f8f9] w-full md:w-auto"
          size="lg"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};