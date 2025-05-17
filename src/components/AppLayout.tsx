
import { ReactNode, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <AppHeader title={title} />
          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
