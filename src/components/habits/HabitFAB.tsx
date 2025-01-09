import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitFABProps {
  onClick: () => void;
  className?: string;
}

export function HabitFAB({ onClick, className }: HabitFABProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 z-50 p-4 rounded-full bg-primary text-white shadow-lg",
        "transform transition-transform active:scale-95 hover:scale-105",
        "md:hidden", // Only show on mobile
        className
      )}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}