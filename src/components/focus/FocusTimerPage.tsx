import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { TimerSettings } from "./TimerSettings";
import { SessionProgress } from "./SessionProgress";

type TimerMode = "focus" | "break";

export const FocusTimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const totalTime = mode === "focus" ? focusDuration * 60 : breakDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = async () => {
    setIsActive(false);
    
    if (mode === "focus") {
      setSessionsCompleted(prev => prev + 1);
      const { error } = await supabase
        .from("focus_sessions")
        .insert([{ 
          duration_minutes: focusDuration,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);
      
      if (error) {
        console.error("Error recording focus session:", error);
      }
      
      toast.success("Focus session completed! Time for a break.", {
        description: `You've completed ${sessionsCompleted + 1} sessions today!`
      });
      setMode("break");
      setTimeLeft(breakDuration * 60);
    } else {
      toast.success("Break time's over! Ready to focus again?");
      setMode("focus");
      setTimeLeft(focusDuration * 60);
    }

    if (Notification.permission === "granted") {
      new Notification(mode === "focus" ? "Break Time!" : "Back to Focus!");
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? focusDuration * 60 : breakDuration * 60);
  };

  const updateDuration = (newDuration: number, timerMode: TimerMode) => {
    if (timerMode === "focus") {
      setFocusDuration(newDuration);
      if (mode === "focus" && !isActive) {
        setTimeLeft(newDuration * 60);
      }
    } else {
      setBreakDuration(newDuration);
      if (mode === "break" && !isActive) {
        setTimeLeft(newDuration * 60);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-8">
        <Card className="p-8 shadow-lg">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-primary">
              {mode === "focus" ? "Focus Time" : "Break Time"}
            </h1>
            
            <TimerDisplay 
              timeLeft={timeLeft}
              progress={progress}
              formatTime={formatTime}
            />

            <TimerControls 
              isActive={isActive}
              onToggle={toggleTimer}
              onReset={resetTimer}
            />

            <TimerSettings 
              focusDuration={focusDuration}
              breakDuration={breakDuration}
              isActive={isActive}
              onFocusDurationChange={(value) => updateDuration(value, "focus")}
              onBreakDurationChange={(value) => updateDuration(value, "break")}
            />
          </div>
        </Card>

        <SessionProgress sessionsCompleted={sessionsCompleted} />
      </div>
    </div>
  );
};