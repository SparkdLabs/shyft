import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingFormData } from "@/types/onboarding";

interface StepTwoProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

export const StepTwo = ({ formData, onChange }: StepTwoProps) => {
  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Career Goals</h2>
      <p className="text-gray-600">What's your primary career goal?</p>
      <RadioGroup
        value={formData.goal}
        onValueChange={(value: OnboardingFormData['goal']) => onChange({ goal: value })}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="promotion" id="promotion" />
            <Label htmlFor="promotion">Get a promotion</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="switch" id="switch" />
            <Label htmlFor="switch">Switch roles/careers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="skills" id="skills" />
            <Label htmlFor="skills">Build new skills</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};