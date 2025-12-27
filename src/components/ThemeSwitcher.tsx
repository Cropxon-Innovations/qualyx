import { useTheme, ThemeName, themeInfo } from "@/contexts/ThemeContext";
import { Monitor, Sun, Palette, Layers, FileText } from "lucide-react";

const themeIcons: Record<ThemeName, React.ElementType> = {
  "dark-enterprise": Monitor,
  "light-enterprise": Sun,
  "gradient-tech": Palette,
  "neumorphism": Layers,
  "material": FileText,
};

export const ThemeSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { theme, setTheme } = useTheme();

  const themes: ThemeName[] = [
    "dark-enterprise",
    "light-enterprise",
    "gradient-tech",
    "neumorphism",
    "material",
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/30">
        {themes.map((t) => {
          const Icon = themeIcons[t];
          const isActive = theme === t;
          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-2 rounded-md transition-all duration-200 ${
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              title={themeInfo[t].name}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
      <h3 className="text-sm font-medium text-foreground mb-3">Theme</h3>
      <div className="space-y-2">
        {themes.map((t) => {
          const Icon = themeIcons[t];
          const isActive = theme === t;
          const info = themeInfo[t];
          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                isActive 
                  ? "bg-primary/10 border border-primary/30" 
                  : "hover:bg-muted/50 border border-transparent"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {info.name}
                </p>
                <p className="text-xs text-muted-foreground/70">{info.bestFor}</p>
              </div>
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
