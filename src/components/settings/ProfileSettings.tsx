import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./profile/ProfileForm";
import { useProfile } from "./profile/useProfile";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSettings() {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your public profile information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm initialData={profile || undefined} />
      </CardContent>
    </Card>
  );
}