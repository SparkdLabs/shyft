import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface SessionProgressProps {
  sessionsCompleted: number;
}

export const SessionProgress = ({ sessionsCompleted }: SessionProgressProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">Today's Progress</h2>
          <p className="text-muted-foreground">
            You've completed {sessionsCompleted} focus sessions today
          </p>
        </div>
        <Bell 
          className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={() => Notification.requestPermission()}
        />
      </div>
    </Card>
  );
};