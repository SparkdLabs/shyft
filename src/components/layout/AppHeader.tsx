import { Calendar, Bell, Users, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppHeader = ({ activeTab, onTabChange }: AppHeaderProps) => {
  const navItems = [
    { label: 'Dashboard', icon: <Calendar size={20} /> },
    { label: 'Circles', icon: <Users size={20} /> },
    { label: 'Library', icon: <Bell size={20} /> },
    { label: 'Add Habit', icon: <Plus size={20} /> }
  ];

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full md:w-auto">
            <h2 
              className="text-xl font-bold text-gray-900 cursor-pointer" 
              onClick={() => onTabChange('dashboard')}
            >
              Shyft
            </h2>
            <nav className="flex flex-wrap gap-2 md:gap-6">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={activeTab === item.label.toLowerCase() ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  onClick={() => onTabChange(item.label.toLowerCase())}
                >
                  {item.icon}
                  <span className="text-inherit">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
          <Button className="mt-4 md:mt-0">
            Start tracking <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Simplify your habits
            <span className="text-blue-400 ml-2">✧</span>
            <span className="text-yellow-400">✦</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Track your personalized habit journey.
          </p>
        </div>
      </div>
    </header>
  );
};