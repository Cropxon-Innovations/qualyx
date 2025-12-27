import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeName = "dark" | "light";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeClass: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeClassMap: Record<ThemeName, string> = {
  "dark": "",
  "light": "theme-light-enterprise",
};

const STORAGE_KEY = "qualyx-theme";

export const ThemeProvider = ({ 
  children, 
  defaultTheme = "dark" 
}: { 
  children: React.ReactNode; 
  defaultTheme?: ThemeName;
}) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (stored && Object.keys(themeClassMap).includes(stored)) {
        return stored;
      }
    }
    return defaultTheme;
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    
    Object.values(themeClassMap).forEach((cls) => {
      if (cls) root.classList.remove(cls);
    });
    
    const themeClass = themeClassMap[theme];
    if (themeClass) {
      root.classList.add(themeClass);
    }
  }, [theme]);

  const themeClass = themeClassMap[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeClass }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const themeInfo: Record<ThemeName, { 
  name: string; 
  icon: "moon" | "sun";
}> = {
  "dark": {
    name: "Dark",
    icon: "moon"
  },
  "light": {
    name: "Light", 
    icon: "sun"
  },
};