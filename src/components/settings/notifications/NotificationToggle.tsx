import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { NotificationFormValues } from "./useNotificationSettings";

interface NotificationToggleProps {
  form: UseFormReturn<NotificationFormValues>;
  name: keyof NotificationFormValues;
  label: string;
  description: string;
}

export function NotificationToggle({ form, name, label, description }: NotificationToggleProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>
              {description}
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}