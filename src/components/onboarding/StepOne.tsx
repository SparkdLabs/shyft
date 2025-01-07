import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingFormData } from "@/types/onboarding";

interface StepOneProps {
  formData: OnboardingFormData;
  onChange: (data: Partial<OnboardingFormData>) => void;
}

export const StepOne = ({ formData, onChange }: StepOneProps) => {
  return (
    <div className="space-y-4 animate-slideUp">
      <h2 className="text-2xl font-semibold text-primary">Welcome to Shyft</h2>
      <p className="text-gray-600">Let's start by learning about your current role.</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="role">Current Role/Title</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => onChange({ role: e.target.value })}
            placeholder="e.g. Product Manager"
          />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            placeholder="e.g. Technology"
          />
        </div>
      </div>
    </div>
  );
};