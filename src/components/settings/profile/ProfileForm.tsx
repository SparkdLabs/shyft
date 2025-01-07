import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface ProfileFormValues {
  username: string;
  fullName: string;
  bio: string;
}

interface ProfileFormProps {
  initialData?: {
    username?: string;
    fullName?: string;
    bio?: string;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      username: initialData?.username || '',
      fullName: initialData?.fullName || '',
      bio: initialData?.bio || '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('No user found');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.fullName,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Write a short bio about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}