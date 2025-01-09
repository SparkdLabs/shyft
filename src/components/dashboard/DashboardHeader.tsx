import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FeedbackDialog } from "./FeedbackDialog";
import { InstallPrompt } from "../pwa/InstallPrompt";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session error:", error);
        await supabase.auth.signOut();
        navigate("/login");
        return;
      }

      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Please try again.");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white rounded-xl p-4 md:p-8 shadow-sm border border-[#edeae9] space-y-4 md:space-y-0 mt-14 md:mt-0">
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-[#151b26] mb-1">Welcome Back</h1>
        <p className="text-sm md:text-base text-[#6f7782]">Track your progress and build better habits</p>
      </div>
      <div className="flex gap-2">
        <InstallPrompt />
        <FeedbackDialog />
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