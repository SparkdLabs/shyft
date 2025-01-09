import { Label } from "@/components/ui/label";
import { OnboardingFormData } from "@/types/onboarding";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StepFiveProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

const categories = [
  "health",
  "career",
  "personal",
  "learning",
  "relationships",
  "productivity"
];

export const StepFive = ({ formData, onChange }: StepFiveProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    formData.preferredCategories || []
  );

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onChange({ preferredCategories: newCategories });
  };

  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Habit Categories</h2>
      <p className="text-gray-600">Which areas would you like to focus on?</p>
      <p className="text-sm text-muted-foreground">Select all that apply</p>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors capitalize"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};