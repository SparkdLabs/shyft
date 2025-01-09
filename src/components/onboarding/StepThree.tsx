import { OnboardingFormData } from "@/types/onboarding";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StepThreeProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

const challenges = [
  "Time Management",
  "Staying Motivated",
  "Maintaining Consistency",
  "Setting Priorities",
  "Breaking Bad Habits",
  "Finding Balance",
  "Overcoming Procrastination",
  "Managing Stress",
  "Building Self-Discipline",
  "Tracking Progress"
];

export const StepThree = ({ formData, onChange }: StepThreeProps) => {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>(
    formData.challenges || []
  );

  const toggleChallenge = (challenge: string) => {
    const newChallenges = selectedChallenges.includes(challenge)
      ? selectedChallenges.filter(c => c !== challenge)
      : [...selectedChallenges, challenge];
    
    setSelectedChallenges(newChallenges);
    onChange({ challenges: newChallenges });
  };

  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Current Challenges</h2>
      <p className="text-gray-600">What challenges would you like to overcome?</p>
      <p className="text-sm text-muted-foreground">Select all that apply</p>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {challenges.map((challenge) => (
          <Badge
            key={challenge}
            variant={selectedChallenges.includes(challenge) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => toggleChallenge(challenge)}
          >
            {challenge}
          </Badge>
        ))}
      </div>
    </div>
  );
};