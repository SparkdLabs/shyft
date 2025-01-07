import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";

export const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    industry: "",
    goal: "promotion",
    challenge: "time",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-lg p-8 animate-fadeIn">
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-slideUp">
              <h2 className="text-2xl font-semibold text-primary">Welcome to The Shift</h2>
              <p className="text-gray-600">Let's start by learning about your current role.</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">Current Role/Title</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Product Manager"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Technology"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-slideUp">
              <h2 className="text-2xl font-semibold text-primary">Career Goals</h2>
              <p className="text-gray-600">What's your primary career goal?</p>
              <RadioGroup
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value })}
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
          )}

          {step === 3 && (
            <div className="space-y-4 animate-slideUp">
              <h2 className="text-2xl font-semibold text-primary">Current Challenges</h2>
              <p className="text-gray-600">What's your biggest challenge right now?</p>
              <RadioGroup
                value={formData.challenge}
                onValueChange={(value) => setFormData({ ...formData, challenge: value })}
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