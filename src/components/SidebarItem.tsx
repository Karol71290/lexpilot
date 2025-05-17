
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

interface SidebarItemProps {
  path: string;
  icon: LucideIcon;
  title: string;
  isActive: boolean;
}

export default function SidebarItem({ path, icon: Icon, title, isActive }: SidebarItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          isActive && "bg-sidebar-accent text-white"
        )}
      >
        <Link to={path} className="flex items-center">
          <Icon className="h-5 w-5 mr-3" />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
