import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConsoleTopNav } from "./ConsoleTopNav";
import { ConsoleSidebar } from "./ConsoleSidebar";
import { cn } from "@/lib/utils";

export const ConsoleLayout = () => {
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
          <Outlet />
        </div>
      </main>
    </div>
  );
};
