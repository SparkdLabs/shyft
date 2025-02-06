import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { HabitTracker } from "../habits/HabitTracker";
import { HabitCircles } from "../habits/HabitCircles";

export const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'circles':
        return <HabitCircles />;
      case 'dashboard':
      default:
        return <HabitTracker />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};