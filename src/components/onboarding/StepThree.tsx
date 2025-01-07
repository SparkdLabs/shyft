import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingFormData } from "@/types/onboarding";

interface StepThreeProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

export const StepThree = ({ formData, onChange }: StepThreeProps) => {
  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Current Challenges</h2>
      <p className="text-gray-600">What's your biggest challenge right now?</p>
      <RadioGroup
        value={formData.challenge}
        onValueChange={(value: OnboardingFormData['challenge']) => onChange({ challenge: value })}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="time" id="time" />
            <Label htmlFor="time">Time management</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="clarity" id="clarity" />
            <Label htmlFor="clarity">Lack of clarity/direction</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="network" id="network" />
            <Label htmlFor="network">Building my network</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};