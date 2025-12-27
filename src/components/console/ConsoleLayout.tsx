import { useState, ReactNode } from "react";
import { ConsoleTopNav } from "./ConsoleTopNav";
import { ConsoleSidebar } from "./ConsoleSidebar";
import { cn } from "@/lib/utils";

interface ConsoleLayoutProps {
  children: ReactNode;
}

export const ConsoleLayout = ({ children }: ConsoleLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ConsoleTopNav 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
        sidebarCollapsed={sidebarCollapsed}
      />
      <ConsoleSidebar collapsed={sidebarCollapsed} />
      <main 
        className={cn(
          "pt-14 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "pl-16" : "pl-56"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
