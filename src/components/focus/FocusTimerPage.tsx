import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Bell, Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type TimerMode = "focus" | "break";

export const FocusTimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Calculate progress percentage
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
      // Record focus session completion in Supabase
      const { error } = await supabase
        .from("focus_sessions")
        .insert([{ duration_minutes: focusDuration }]);
      
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

    // Request notification permission and show notification
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
            
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Progress
                value={progress}
                className="h-48 w-48 rounded-full [transform:rotate(-90deg)]"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={toggleTimer}
                className="w-32 bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isActive ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" /> Start
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
                className="w-32"
              >
                <RotateCcw className="mr-2 h-5 w-5" /> Reset
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-primary">
                    <Brain className="mr-2 h-5 w-5" /> Focus Duration
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {focusDuration} min
                  </span>
                </div>
                <Slider
                  value={[focusDuration]}
                  onValueChange={([value]) => updateDuration(value, "focus")}
                  min={5}
                  max={60}
                  step={5}
                  disabled={isActive}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-primary">
                    <Coffee className="mr-2 h-5 w-5" /> Break Duration
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {breakDuration} min
                  </span>
                </div>
                <Slider
                  value={[breakDuration]}
                  onValueChange={([value]) => updateDuration(value, "break")}
                  min={1}
                  max={15}
                  step={1}
                  disabled={isActive}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Today's Progress</h2>
              <p className="text-muted-foreground">
                You've completed {sessionsCompleted} focus sessions today
              </p>
            </div>
            <Bell 
              className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={() => Notification.requestPermission()}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};