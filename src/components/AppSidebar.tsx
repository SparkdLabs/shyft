import {
  LayoutDashboard,
  CheckCircle2,
  Timer,
  Calendar,
  Trophy,
  Settings,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Habits",
    icon: CheckCircle2,
    url: "/habits",
  },
  {
    title: "Focus Timer",
    icon: Timer,
    url: "/focus",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Achievements",
    icon: Trophy,
    url: "/achievements",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <Sidebar defaultCollapsed={isMobile}>
      <SidebarHeader className="p-4 md:p-6 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <SidebarTrigger>
            <Menu className="h-6 w-6 text-primary hover:text-secondary transition-colors" />
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shyft
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3 md:p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
              >
                <button
                  onClick={() => navigate(item.url)}
                  className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-primary/80 hover:text-secondary hover:bg-muted transition-colors w-full text-sm md:text-base"
                >
                  <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium">{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};