import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useHabits } from "@/hooks/useHabits";
import { toast } from "sonner";

interface HabitWizardProps {
  onClose: () => void;
}

export const HabitWizard = ({ onClose }: HabitWizardProps) => {
  const [step, setStep] = useState(1);
  const [habitData, setHabitData] = useState({
    name: "",
    description: "",
    period: "daily" as "daily" | "weekly" | "monthly",
  });
  const { createHabit } = useHabits();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleCreate();
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCreate = async () => {
    try {
      await createHabit.mutateAsync({
        name: habitData.name,
        period: habitData.period
      });
      toast.success("Habit created successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create habit");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Habit - Step {step} of 3</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  What habit would you like to build?
                </label>
                <Input
                  placeholder="e.g., Read for 30 minutes"
                  value={habitData.name}
                  onChange={(e) =>
                    setHabitData({ ...habitData, name: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  How often would you like to do this?
                </label>
                <Select
                  value={habitData.period}
                  onValueChange={(value: "daily" | "weekly" | "monthly") =>
                    setHabitData({ ...habitData, period: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Add any notes or description (optional)
                </label>
                <Textarea
                  placeholder="Add any additional details..."
                  value={habitData.description}
                  onChange={(e) =>
                    setHabitData({ ...habitData, description: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === 3 ? "Create Habit" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};