import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeName = 
  | "dark-enterprise" 
  | "light-enterprise" 
  | "gradient-tech";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeClass: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeClassMap: Record<ThemeName, string> = {
  "dark-enterprise": "",
  "light-enterprise": "theme-light-enterprise",
  "gradient-tech": "theme-gradient-tech",
};

const STORAGE_KEY = "qualyx-theme";

export const ThemeProvider = ({ 
  children, 
  defaultTheme = "dark-enterprise" 
}: { 
  children: React.ReactNode; 
  defaultTheme?: ThemeName;
}) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // Try to load from localStorage on initial render
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
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    Object.values(themeClassMap).forEach((cls) => {
      if (cls) root.classList.remove(cls);
    });
    
    // Add current theme class
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

// Theme info for display purposes
export const themeInfo: Record<ThemeName, { 
  name: string; 
  description: string;
  colors: {
    bg: string;
    accent: string;
    text: string;
  };
}> = {
  "dark-enterprise": {
    name: "Dark Enterprise",
    description: "Premium charcoal with cyan accents",
    colors: {
      bg: "#0a0d12",
      accent: "#0ea5e9",
      text: "#f1f5f9"
    }
  },
  "light-enterprise": {
    name: "Light Enterprise", 
    description: "Clean off-white with navy accents",
    colors: {
      bg: "#f8fafc",
      accent: "#1d4ed8",
      text: "#1e293b"
    }
  },
  "gradient-tech": {
    name: "Gradient Tech",
    description: "Deep indigo with cyan glow",
    colors: {
      bg: "#0f172a",
      accent: "#06b6d4",
      text: "#f1f5f9"
    }
  },
};