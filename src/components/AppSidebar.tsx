import {
  LayoutDashboard,
  CheckCircle2,
  Timer,
  Trophy,
  Settings,
  Menu,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";

interface AppSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

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

export function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useSidebar();
  
  const setOpen = (value: boolean) => {
    onOpenChange?.(value);
  };

  const MenuContent = () => (
    <>
      <SidebarHeader className="p-4 md:p-6 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Shyft
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3 md:p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                onClick={() => {
                  navigate(item.url);
                  if (isMobile) {
                    setOpen(false);
                  }
                }}
              >
                <button className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-primary/80 hover:text-secondary hover:bg-muted transition-colors w-full text-sm md:text-base">
                  <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium">{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-[240px] p-0">
            <MenuContent />
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar>
          <MenuContent />
        </Sidebar>
      )}
    </>
  );
}