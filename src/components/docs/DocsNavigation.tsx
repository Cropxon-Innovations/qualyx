import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Github } from "lucide-react";

export const DocsNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Q</span>
          </div>
          <span className="text-foreground font-semibold text-lg">QUALYX</span>
          <span className="text-muted-foreground text-sm ml-2">Docs</span>
        </Link>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg border border-border text-sm text-muted-foreground w-64">
            <Search className="w-4 h-4" />
            <span>Search docs...</span>
            <kbd className="ml-auto px-1.5 py-0.5 text-xs bg-background rounded border border-border">⌘K</kbd>
          </div>
          
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </a>
          
          <Button variant="default" size="sm">
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
};
