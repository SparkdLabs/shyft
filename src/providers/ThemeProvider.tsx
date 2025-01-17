"use client";

import * as React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  React.useEffect(() => {
    // Check local storage or system preference
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    // Apply theme
    document.documentElement.classList.toggle("dark", isDark);
    
    // Store preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}

// Custom hook for theme toggling
export function useTheme() {
  const toggleTheme = React.useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  }, []);

  return { toggleTheme };
}