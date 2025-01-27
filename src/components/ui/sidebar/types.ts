import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { TooltipContentProps } from "@radix-ui/react-tooltip";
import { sidebarMenuButtonVariants } from "./variants";

export type SidebarState = "expanded" | "collapsed";

export type SidebarContext = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export type SidebarProviderProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

export type SidebarProps = {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
  children?: ReactNode;
};

export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | TooltipContentProps;
} & VariantProps<typeof sidebarMenuButtonVariants>;