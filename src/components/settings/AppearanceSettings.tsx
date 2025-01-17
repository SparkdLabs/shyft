import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/providers/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";

interface AppearanceFormValues {
  theme: "light" | "dark" | "system";
}

export function AppearanceSettings() {
  const { toggleTheme } = useTheme();
  
  const form = useForm<AppearanceFormValues>({
    defaultValues: {
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    const isDark = document.documentElement.classList.contains("dark");
    const shouldBeDark = data.theme === "dark" || 
      (data.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark !== shouldBeDark) {
      toggleTheme();
    }
    
    localStorage.setItem("theme", data.theme);
    toast.success('Theme updated successfully');
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how Shyft looks on your device
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
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <Sun className="mb-2 h-6 w-6" />
                          Light
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="dark"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <Moon className="mb-2 h-6 w-6" />
                          Dark
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="system"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <Monitor className="mb-2 h-6 w-6" />
                          System
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