
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Search, Settings, User } from "lucide-react";

interface AppHeaderProps {
  title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const isMobile = useIsMobile();
  const [notifications] = useState(3);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {isMobile && <SidebarTrigger className="mr-4" />}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center space-x-2">
        {!isMobile && (
          <div className="relative mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            />
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary text-xs flex items-center justify-center text-white" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              New training module available
            </DropdownMenuItem>
            <DropdownMenuItem>Weekly feedback reminder</DropdownMenuItem>
            <DropdownMenuItem>Project milestone due tomorrow</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
