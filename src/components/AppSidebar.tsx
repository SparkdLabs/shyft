import {
  Calendar,
  Home,
  Settings,
  CheckCircle2,
  Timer,
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

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "Habits",
    icon: CheckCircle2,
    url: "/habits",
  },
  {
    title: "Timer",
    icon: Timer,
    url: "/timer",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <SidebarTrigger>
            <Menu className="h-6 w-6 text-primary hover:text-secondary transition-colors" />
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shyft
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a 
                  href={item.url} 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary/80 hover:text-secondary hover:bg-muted transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}