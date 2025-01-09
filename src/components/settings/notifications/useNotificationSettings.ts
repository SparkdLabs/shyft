import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface NotificationFormValues {
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

export function useNotificationSettings() {
  const queryClient = useQueryClient();

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

  return {
    settings,
    isLoading,
    updateSettings: mutation.mutate,
  };
}