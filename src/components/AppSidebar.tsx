import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { SidebarItem } from "@/components/SidebarItem"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { Home, Settings, MessageSquareText, Bot, BookOpen, FileText, UsersRound, Sparkles, BarChart, GraduationCap } from "lucide-react";

export function AppSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="h-screen fixed left-0 top-0 z-30 flex w-[220px] flex-col border-r bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold tracking-tight">Lovable</h1>
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[220px] p-0">
              <SheetHeader className="px-4 py-3">
                <SheetTitle>Lovable</SheetTitle>
                <SheetDescription>
                  Navigate your workspace.
                </SheetDescription>
              </SheetHeader>
              <Separator />
              <div className="space-y-1 py-2">
                <h2 className="relative px-7 text-xs font-semibold tracking-tight">
                  General
                </h2>

                <SidebarItem to="/" icon={<Home className="h-5 w-5" />}>
                  Dashboard
                </SidebarItem>

                <SidebarItem to="/prompt-builder" icon={<Sparkles className="h-5 w-5" />}>
                  Prompt Builder
                </SidebarItem>

                <SidebarItem to="/chat-test" icon={<MessageSquareText className="h-5 w-5" />}>
                  Chat Test
                </SidebarItem>
                
                <h2 className="relative px-7 text-xs font-semibold tracking-tight">
                  Settings
                </h2>

                <SidebarItem to="/settings" icon={<Settings className="h-5 w-5" />}>
                  Settings
                </SidebarItem>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      {!isMobile && (
        <div className="space-y-1 py-2">
          <h2 className="relative px-7 text-xs font-semibold tracking-tight">
            General
          </h2>

          <SidebarItem to="/" icon={<Home className="h-5 w-5" />}>
            Dashboard
          </SidebarItem>

          <SidebarItem to="/prompt-builder" icon={<Sparkles className="h-5 w-5" />}>
            Prompt Builder
          </SidebarItem>

          <SidebarItem to="/chat-test" icon={<MessageSquareText className="h-5 w-5" />}>
            Chat Test
          </SidebarItem>
          
          <h2 className="relative px-7 text-xs font-semibold tracking-tight">
            Settings
          </h2>

          <SidebarItem to="/settings" icon={<Settings className="h-5 w-5" />}>
            Settings
          </SidebarItem>
        </div>
      )}
    </aside>
  );
}
