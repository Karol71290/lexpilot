
import {
  Calendar,
  BookOpen,
  Settings,
  Users,
  FileText,
  MessageSquare,
  LayoutDashboard,
  PenTool,
  Shield,
  LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "@/components/SidebarItem";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export function AppSidebar() {
  const location = useLocation();
  
  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "AI Adoption Quiz",
      path: "/quiz",
      icon: FileText,
    },
    {
      title: "My Persona",
      path: "/my-persona",
      icon: Users,
    },
    {
      title: "All Personas",
      path: "/all-personas",
      icon: Users,
    },
  ];

  const toolsNavItems: NavItem[] = [
    {
      title: "Prompt Builder",
      path: "/prompt-builder",
      icon: PenTool,
    },
    {
      title: "AI Use Policy Generator",
      path: "/ai-use-policy-generator",
      icon: Shield,
    },
    {
      title: "Training Hub",
      path: "/training-hub",
      icon: BookOpen,
    },
    {
      title: "Project Planner",
      path: "/project-planner",
      icon: Calendar,
    },
    {
      title: "Feedback Tracker",
      path: "/feedback-tracker",
      icon: MessageSquare,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-6 py-5">
        <span className="text-xl font-bold text-white flex items-center">
          <BookOpen className="mr-2" />
          LawAdapt Pro
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools & Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Updates</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/ai-releases">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>New AI Releases</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <Link to="/settings" className="text-sm text-gray-300 flex items-center hover:text-white transition-colors">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
          <span className="text-xs text-gray-400">v1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
