import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-[100dvh] w-full">
        <AppSidebar />
        <div className="flex-1 bg-gradient-to-br from-[#f6f8f9] via-white to-[#f6f8f9] p-3 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto space-y-4 md:space-y-8 animate-fadeIn safe-area-inset-bottom pb-safe">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};