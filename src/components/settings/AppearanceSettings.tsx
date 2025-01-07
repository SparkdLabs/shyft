import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AppearanceFormValues {
  theme: "light" | "dark" | "system";
}

export function AppearanceSettings() {
  const form = useForm<AppearanceFormValues>({
    defaultValues: {
      theme: "system",
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    toast.success('Appearance settings updated');
    console.log('Appearance settings:', data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how Shyft looks on your device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="light"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <span>Light</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="dark"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <span>Dark</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="system"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <span>System</span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Select a theme for your application
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Save preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}