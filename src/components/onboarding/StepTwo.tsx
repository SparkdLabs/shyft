import { OnboardingFormData } from "@/types/onboarding";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StepTwoProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

const primaryGoals = [
  "Build Better Habits",
  "Improve Health",
  "Learn New Skills",
  "Increase Productivity",
  "Enhance Relationships",
  "Achieve Work-Life Balance",
  "Personal Development",
  "Financial Growth",
  "Creative Expression",
  "Mental Clarity"
];

export const StepTwo = ({ formData, onChange }: StepTwoProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(formData.primaryGoals || []);

  const toggleGoal = (goal: string) => {
    const newGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal];
    
    setSelectedGoals(newGoals);
    onChange({ primaryGoals: newGoals });
  };

  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Your Goals</h2>
      <p className="text-gray-600">What are your primary goals?</p>
      <p className="text-sm text-muted-foreground">Select all that apply</p>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {primaryGoals.map((goal) => (
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