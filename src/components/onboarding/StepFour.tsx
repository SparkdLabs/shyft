import { Label } from "@/components/ui/label";
import { OnboardingFormData } from "@/types/onboarding";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StepFourProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

const habitGoals = [
  "Build lasting habits",
  "Improve productivity",
  "Achieve work-life balance",
  "Personal growth",
  "Career development",
  "Health and wellness",
  "Better time management",
  "Stress reduction"
];

export const StepFour = ({ formData, onChange }: StepFourProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(formData.habitGoals || []);

  const toggleGoal = (goal: string) => {
    const newGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal];
    
    setSelectedGoals(newGoals);
    onChange({ habitGoals: newGoals });
  };

  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Your Goals</h2>
      <p className="text-gray-600">What do you hope to achieve with habit tracking?</p>
      <p className="text-sm text-muted-foreground">Select all that apply</p>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {habitGoals.map((goal) => (
          <Badge
            key={goal}
            variant={selectedGoals.includes(goal) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => toggleGoal(goal)}
          >
            {goal}
          </Badge>
        ))}
      </div>
    </div>
  );
};