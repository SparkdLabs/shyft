import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "./ProfileSettings";
import { NotificationSettings } from "./NotificationSettings";
import { AppearanceSettings } from "./AppearanceSettings";

export function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="appearance" className="space-y-4">
            <AppearanceSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}