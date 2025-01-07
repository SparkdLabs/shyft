import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, LogOut } from "lucide-react";
import { FocusTimer } from "./FocusTimer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { HabitList } from "./habits/HabitList";
import { ProgressCard } from "./habits/ProgressCard";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-primary">Welcome Back</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowTimer(true)}
              className="bg-accent hover:bg-accent/90"
            >
              <Timer className="mr-2 h-4 w-4" />
              Start Focus Session
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="text-gray-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <HabitList />
          </Card>

          <Card className="p-6">
            <ProgressCard />
          </Card>
        </div>

        {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
      </div>
    </div>
  );
};