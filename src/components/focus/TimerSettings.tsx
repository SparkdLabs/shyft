import { Slider } from "@/components/ui/slider";
import { Brain, Coffee } from "lucide-react";

interface TimerSettingsProps {
  focusDuration: number;
  breakDuration: number;
  isActive: boolean;
  onFocusDurationChange: (value: number) => void;
  onBreakDurationChange: (value: number) => void;
}

export const TimerSettings = ({
  focusDuration,
  breakDuration,
  isActive,
  onFocusDurationChange,
  onBreakDurationChange,
}: TimerSettingsProps) => {
  return (
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
          onValueChange={([value]) => onFocusDurationChange(value)}
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
          onValueChange={([value]) => onBreakDurationChange(value)}
          min={1}
          max={15}
          step={1}
          disabled={isActive}
        />
      </div>
    </div>
  );
};