import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { toast } from "sonner";

interface AddStepDialogProps {
  parentHabitId: string;
  onClose: () => void;
}

export const AddStepDialog = ({ parentHabitId, onClose }: AddStepDialogProps) => {
  const [name, setName] = useState("");
  const { createHabit } = useHabits();

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name for the step");
      return;
    }

    try {
      await createHabit.mutateAsync({
        name,
        parentHabitId,
      });
      toast.success("Step added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add step");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Step</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Input
              placeholder="Enter step name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Add Step
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};