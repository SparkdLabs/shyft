import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HabitFiltersProps {
  selectedPeriod: "daily" | "weekly" | "monthly";
  onPeriodChange: (value: "daily" | "weekly" | "monthly") => void;
}

export const HabitFilters = ({ selectedPeriod, onPeriodChange }: HabitFiltersProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[140px] bg-white">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-md">
          <SelectItem value="daily" className="hover:bg-gray-50">Daily View</SelectItem>
          <SelectItem value="weekly" className="hover:bg-gray-50">Weekly View</SelectItem>
          <SelectItem value="monthly" className="hover:bg-gray-50">Monthly View</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};