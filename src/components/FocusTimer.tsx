import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Play, Pause } from "lucide-react";

interface FocusTimerProps {
  onClose: () => void;
}

export const FocusTimer = ({ onClose }: FocusTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="fixed inset-0 md:inset-auto md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-96 bg-white p-4 md:p-6 rounded-none md:rounded-lg shadow-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-primary">Focus Timer</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center space-y-6 md:space-y-8">
        <div className="text-4xl md:text-6xl font-bold text-primary">{formatTime(timeLeft)}</div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={toggleTimer}
            className="bg-primary hover:bg-primary/90 w-28 md:w-32"
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};