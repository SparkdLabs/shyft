import { OnboardingFormData } from "@/types/onboarding";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StepOneProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

const focusAreas = [
  "Health & Fitness",
  "Personal Growth",
  "Career & Work",
  "Relationships",
  "Hobbies & Interests",
  "Finance",
  "Mental Wellbeing",
  "Learning",
  "Creativity",
  "Spirituality"
];

export const StepOne = ({ formData, onChange }: StepOneProps) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(formData.focusAreas || []);

  const toggleArea = (area: string) => {
    const newAreas = selectedAreas.includes(area)
      ? selectedAreas.filter(a => a !== area)
      : [...selectedAreas, area];
    
    setSelectedAreas(newAreas);
    onChange({ focusAreas: newAreas });
  };

  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Welcome to Shyft</h2>
      <p className="text-gray-600">What areas of your life would you like to focus on?</p>
      <p className="text-sm text-muted-foreground">Select all that apply</p>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {focusAreas.map((area) => (
          <Badge
            key={area}
            variant={selectedAreas.includes(area) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => toggleArea(area)}
          >
            {area}
          </Badge>
        ))}
      </div>
    </div>
  );
};