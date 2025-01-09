import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { StepOne } from "./onboarding/StepOne";
import { StepTwo } from "./onboarding/StepTwo";
import { StepThree } from "./onboarding/StepThree";
import { StepFour } from "./onboarding/StepFour";
import { StepFive } from "./onboarding/StepFive";
import { OnboardingFormData } from "@/types/onboarding";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    focusAreas: [],
    primaryGoals: [],
    challenges: [],
    habitGoals: [],
    habitMotivations: [],
    preferredCategories: [],
  });

  const handleUpdateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            id: user.id,
            focus_areas: formData.focusAreas,
            primary_goals: formData.primaryGoals,
            challenges: formData.challenges,
            habit_goals: formData.habitGoals,
            habit_motivations: formData.habitMotivations,
            preferred_habit_categories: formData.preferredCategories,
            onboarding_completed: true
          });

        if (error) throw error;

        toast({
          title: "Onboarding completed!",
          description: "Your preferences have been saved.",
        });

        navigate("/dashboard");
      } catch (error) {
        console.error('Error saving onboarding data:', error);
        toast({
          title: "Error",
          description: "Failed to save your preferences. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-lg p-8 animate-fadeIn">
        <div className="space-y-6">
          {step === 1 && (
            <StepOne formData={formData} onChange={handleUpdateFormData} />
          )}

          {step === 2 && (
            <StepTwo formData={formData} onChange={handleUpdateFormData} />
          )}

          {step === 3 && (
            <StepThree formData={formData} onChange={handleUpdateFormData} />
          )}

          {step === 4 && (
            <StepFour formData={formData} onChange={handleUpdateFormData} />
          )}

          {step === 5 && (
            <StepFive formData={formData} onChange={handleUpdateFormData} />
          )}

          <div className="flex justify-between pt-6">
            <Button 
              onClick={handleBack} 
              variant="outline"
              disabled={step === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {step === 5 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};