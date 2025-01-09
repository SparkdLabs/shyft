import { supabase } from "@/integrations/supabase/client";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return null;
    }
  }
  return null;
}

export async function saveNotificationToken(token: string) {
  const { error } = await supabase
    .from("notification_settings")
    .upsert({ push_token: token }, { onConflict: "user_id" });

  if (error) {
    console.error("Error saving notification token:", error);
    return false;
  }
  return true;
}