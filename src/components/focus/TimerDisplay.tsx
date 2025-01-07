import { Progress } from "@/components/ui/progress";

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  formatTime: (seconds: number) => string;
}

export const TimerDisplay = ({ timeLeft, progress, formatTime }: TimerDisplayProps) => {
  return (
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
  );
};