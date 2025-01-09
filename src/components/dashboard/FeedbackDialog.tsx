import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const FeedbackDialog = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please enter your feedback before submitting");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("user_feedback").insert([
      {
        feedback: feedback.trim(),
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
      return;
    }

    toast.success("Thank you for your feedback!");
    setFeedback("");
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="gap-2 text-[#6f7782] border-[#edeae9] hover:bg-[#f6f8f9]"
        onClick={() => setOpen(true)}
      >
        <MessageSquarePlus className="h-5 w-5" />
        Feedback
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              Help us improve Shyft by sharing your thoughts, suggestions, or feature requests.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What would you like to see in Shyft?"
            className="min-h-[100px]"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};