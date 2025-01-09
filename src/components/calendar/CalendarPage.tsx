import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Calendar as CalendarIcon, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleConnect = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-calendar-auth', {
        body: { redirect_url: window.location.origin + '/calendar' }
      });
      
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      toast.error('Failed to connect to Google Calendar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutlookConnect = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('outlook-calendar-auth', {
        body: { redirect_url: window.location.origin + '/calendar' }
      });
      
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error connecting to Outlook Calendar:', error);
      toast.error('Failed to connect to Outlook Calendar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-gradient-to-b from-muted to-white p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">Calendar</h1>
                <p className="text-muted-foreground">Connect your calendar to sync your habits and focus sessions</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 shadow-sm border-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </Card>

              <Card className="p-6 shadow-sm border-0">
                <h2 className="text-xl font-semibold mb-4">Calendar Integrations</h2>
                <div className="space-y-4">
                  <Button
                    onClick={handleGoogleConnect}
                    className="w-full justify-start"
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Connect Google Calendar
                  </Button>
                  <Button
                    onClick={handleOutlookConnect}
                    className="w-full justify-start"
                    disabled={isLoading}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Connect Outlook Calendar
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}