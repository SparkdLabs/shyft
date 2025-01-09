import React from "react";
import { Progress } from "@/components/ui/progress";

interface HabitProgressProps {
  progress: number;
}

export const HabitProgress: React.FC<HabitProgressProps> = ({ progress }) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">Progress</span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};