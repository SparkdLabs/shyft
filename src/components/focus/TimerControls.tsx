import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls = ({ isActive, onToggle, onReset }: TimerControlsProps) => {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={onToggle}
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
        onClick={onReset}
        variant="outline"
        size="lg"
        className="w-32"
      >
        <RotateCcw className="mr-2 h-5 w-5" /> Reset
      </Button>
    </div>
  );
};