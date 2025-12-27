import { useTheme, ThemeName, themeInfo } from "@/contexts/ThemeContext";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const themes: ThemeName[] = [
  "dark-enterprise",
  "light-enterprise",
  "gradient-tech",
];

// Color swatch component
const ThemeSwatch = ({ colors }: { colors: { bg: string; accent: string; text: string } }) => (
  <div className="flex items-center gap-0.5 rounded overflow-hidden border border-border/30">
    <div className="w-3 h-3" style={{ backgroundColor: colors.bg }} />
    <div className="w-3 h-3" style={{ backgroundColor: colors.accent }} />
    <div className="w-3 h-3" style={{ backgroundColor: colors.text }} />
  </div>
);

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const currentTheme = themeInfo[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-2 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <ThemeSwatch colors={currentTheme.colors} />
          <span className="text-xs font-medium hidden sm:inline">Theme</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[220px] bg-card/95 backdrop-blur-xl border-border/50"
      >
        <div className="px-2 py-1.5 mb-1">
          <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
            Select Theme
          </p>
        </div>
        {themes.map((t) => {
          const info = themeInfo[t];
          const isActive = theme === t;
          
          return (
            <DropdownMenuItem
              key={t}
              onClick={() => setTheme(t)}
              className={`
                flex items-center gap-3 px-2.5 py-2.5 cursor-pointer
                transition-colors duration-150
                ${isActive ? "bg-primary/10" : ""}
              `}
            >
              <ThemeSwatch colors={info.colors} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {info.name}
                </p>
                <p className="text-[10px] text-muted-foreground/60 truncate">
                  {info.description}
                </p>
              </div>
              {isActive && (
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};