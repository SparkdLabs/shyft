import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface NotificationFormValues {
  emailNotifications: boolean;
  pushNotifications: boolean;
  habitReminders: boolean;
  achievementAlerts: boolean;
}

async function fetchNotificationSettings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No user found");

  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function createOrUpdateSettings(values: NotificationFormValues) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No user found");

  const { data: existingSettings } = await supabase
    .from('notification_settings')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (existingSettings) {
    const { error } = await supabase
      .from('notification_settings')
      .update({
        email_notifications: values.emailNotifications,
        push_notifications: values.pushNotifications,
        habit_reminders: values.habitReminders,
        achievement_alerts: values.achievementAlerts,
      })
      .eq('id', existingSettings.id);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('notification_settings')
      .insert([{
        user_id: user.id,
        email_notifications: values.emailNotifications,
        push_notifications: values.pushNotifications,
        habit_reminders: values.habitReminders,
        achievement_alerts: values.achievementAlerts,
      }]);

    if (error) throw error;
  }
}

export function NotificationSettings() {
  const queryClient = useQueryClient();
  const form = useForm<NotificationFormValues>({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      habitReminders: true,
      achievementAlerts: true,
    },
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['notificationSettings'],
    queryFn: fetchNotificationSettings,
  });

  const mutation = useMutation({
    mutationFn: createOrUpdateSettings,
    onSuccess: () => {
      toast.success('Notification preferences updated');
      queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
    },
    onError: (error) => {
      toast.error('Failed to update notification preferences');
      console.error('Error updating notification settings:', error);
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        emailNotifications: settings.email_notifications,
        pushNotifications: settings.push_notifications,
        habitReminders: settings.habit_reminders,
        achievementAlerts: settings.achievement_alerts,
      });
    }
  }, [settings, form]);

  function onSubmit(data: NotificationFormValues) {
    mutation.mutate(data);
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                      Receive email notifications about your activity.
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
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Push Notifications</FormLabel>
                    <FormDescription>
                      Receive push notifications on your device.
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
            <FormField
              control={form.control}
              name="habitReminders"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Habit Reminders</FormLabel>
                    <FormDescription>
                      Get reminded about your daily habits.
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
            <FormField
              control={form.control}
              name="achievementAlerts"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Achievement Alerts</FormLabel>
                    <FormDescription>
                      Get notified when you unlock new achievements.
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
            <Button type="submit">Save preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}