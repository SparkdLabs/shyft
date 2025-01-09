import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "./DashboardHeader";
import { AppSidebar } from "../AppSidebar";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-full">
        <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        
        <div className="flex-1">
          <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
              <div className="w-full flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden bg-primary rounded-full hover:bg-primary/90 mr-6"
                >
                  <Menu className="h-5 w-5 text-white" />
                </Button>
                <DashboardHeader />
              </div>
            </div>
          </div>
          <main className="container">{children}</main>
        </div>
      </div>
    </div>
  );
};