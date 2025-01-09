import { Home, CheckCircle2, Timer, Trophy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: CheckCircle2, label: "Habits", path: "/habits" },
    { icon: Timer, label: "Focus", path: "/focus" },
    { icon: Trophy, label: "Achievements", path: "/achievements" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              location.pathname === item.path
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}