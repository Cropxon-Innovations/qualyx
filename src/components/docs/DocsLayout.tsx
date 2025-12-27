import { ReactNode } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { DocsNavigation } from "./DocsNavigation";

interface DocsLayoutProps {
  children: ReactNode;
}

export const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DocsNavigation />
      <div className="flex pt-16">
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};
