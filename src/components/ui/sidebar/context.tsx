import * as React from "react";
import type { SidebarContext as SidebarContextType, SidebarState } from "./types";

const SidebarContext = React.createContext<SidebarContextType | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

export { SidebarContext, useSidebar };