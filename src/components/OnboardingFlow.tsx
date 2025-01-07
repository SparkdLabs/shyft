import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { StepOne } from "./onboarding/StepOne";
import { StepTwo } from "./onboarding/StepTwo";
import { StepThree } from "./onboarding/StepThree";
import { OnboardingFormData } from "@/types/onboarding";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    role: "",
    industry: "",
    goal: "promotion",
    challenge: "time",
  });

  const handleUpdateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            id: user.id,
            role: formData.role,
            industry: formData.industry,
            career_goal: formData.goal,
            main_challenge: formData.challenge,
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

          <div className="flex justify-end pt-6">
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {step === 3 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};