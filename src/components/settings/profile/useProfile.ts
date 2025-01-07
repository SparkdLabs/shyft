import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string;
  fullName: string;
  bio: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error('No user found');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('username, full_name')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile');
          return;
        }

        if (!profile) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: user.id }]);

          if (insertError) {
            console.error('Error creating profile:', insertError);
            toast.error('Failed to create profile');
            return;
          }

          setProfile({
            username: '',
            fullName: '',
            bio: '',
          });
          return;
        }

        setProfile({
          username: profile.username || '',
          fullName: profile.full_name || '',
          bio: '',
        });
      } catch (error) {
        console.error('Error in loadProfile:', error);
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  return { profile, isLoading };
}