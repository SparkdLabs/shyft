import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationToggle } from "./notifications/NotificationToggle";
import { NotificationFormValues, useNotificationSettings } from "./notifications/useNotificationSettings";

export function NotificationSettings() {
  const form = useForm<NotificationFormValues>({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      habitReminders: true,
      achievementAlerts: true,
    },
  });

  const { settings, isLoading, updateSettings } = useNotificationSettings();

  React.useEffect(() => {
    if (settings) {
      form.reset({
        emailNotifications: settings.email_notifications,
        pushNotifications: settings.push_notifications,
        habitReminders: settings.habit_reminders,
        achievementAlerts: settings.achievement_alerts,
      });
    }
  }, [settings, form]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what notifications you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateSettings)} className="space-y-4">
            <NotificationToggle
              form={form}
              name="emailNotifications"
              label="Email Notifications"
              description="Receive email notifications about your activity."
            />
            <NotificationToggle
              form={form}
              name="pushNotifications"
              label="Push Notifications"
              description="Receive push notifications on your device."
            />
            <NotificationToggle
              form={form}
              name="habitReminders"
              label="Habit Reminders"
              description="Get reminded about your daily habits."
            />
            <NotificationToggle
              form={form}
              name="achievementAlerts"
              label="Achievement Alerts"
              description="Get notified when you unlock new achievements."
            />
            <Button type="submit">Save preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}