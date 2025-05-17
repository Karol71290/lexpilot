
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  text: string;
}

export const SidebarItem = ({ to, icon: Icon, text }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>
      <span>{text}</span>
    </NavLink>
  );
};

export default SidebarItem;
