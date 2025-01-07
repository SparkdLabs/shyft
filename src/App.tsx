import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { Dashboard } from "./components/Dashboard";
import { HabitsPage } from "./components/habits/HabitsPage";
import { FocusTimerPage } from "./components/focus/FocusTimerPage";
import { CalendarPage } from "./components/calendar/CalendarPage";
import { AchievementsPage } from "./components/achievements/AchievementsPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { Auth } from "./components/Auth";
import { MarketingSite } from "./components/marketing/MarketingSite";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <MarketingSite />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />}
            />
            <Route
              path="/onboarding"
              element={
                isAuthenticated ? <OnboardingFlow /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/habits"
              element={
                isAuthenticated ? <HabitsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/focus"
              element={
                isAuthenticated ? <FocusTimerPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/calendar"
              element={
                isAuthenticated ? <CalendarPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/achievements"
              element={
                isAuthenticated ? <AchievementsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;