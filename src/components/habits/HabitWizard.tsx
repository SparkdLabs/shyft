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
  parentHabitId?: string;
}

export const HabitWizard = ({ onClose, parentHabitId }: HabitWizardProps) => {
  const [step, setStep] = useState(1);
  const [habitData, setHabitData] = useState({
    name: "",
    description: "",
    motivation: "",
    period: "daily" as "daily" | "weekly" | "monthly",
    goalTarget: "",
    goalMetric: "",
  });
  const { createHabit } = useHabits();

  const handleNext = () => {
    if (step < 4) {
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
        description: habitData.description,
        period: habitData.period,
        goalTarget: habitData.goalTarget ? parseInt(habitData.goalTarget) : undefined,
        goalMetric: habitData.goalMetric || undefined,
        parentHabitId: parentHabitId,
      });
      toast.success(parentHabitId ? "Sub-habit created successfully!" : "Habit created successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create habit");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {parentHabitId ? "Create New Sub-habit" : "Create New Habit"} - Step {step} of 4
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {parentHabitId ? "What sub-habit would you like to build?" : "What habit would you like to build?"}
                </label>
                <Input
                  placeholder={parentHabitId ? "e.g., Go to gym 3 times a week" : "e.g., Exercise Regularly"}
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
                  Set a measurable goal (optional)
                </label>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Target"
                    value={habitData.goalTarget}
                    onChange={(e) =>
                      setHabitData({ ...habitData, goalTarget: e.target.value })
                    }
                    className="w-1/3"
                  />
                  <Input
                    placeholder="Metric (e.g., minutes, times)"
                    value={habitData.goalMetric}
                    onChange={(e) =>
                      setHabitData({ ...habitData, goalMetric: e.target.value })
                    }
                    className="w-2/3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Why is this habit important to you?
                </label>
                <Textarea
                  placeholder="What motivates you to build this habit?"
                  value={habitData.motivation}
                  onChange={(e) =>
                    setHabitData({ ...habitData, motivation: e.target.value })
                  }
                  className="min-h-[100px]"
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
              {step === 4 ? "Create Habit" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};