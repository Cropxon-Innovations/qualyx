import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeName = 
  | "dark-enterprise" 
  | "light-enterprise" 
  | "gradient-tech" 
  | "neumorphism" 
  | "material";

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
  "neumorphism": "theme-neumorphism",
  "material": "theme-material",
};

export const ThemeProvider = ({ 
  children, 
  defaultTheme = "dark-enterprise" 
}: { 
  children: React.ReactNode; 
  defaultTheme?: ThemeName;
}) => {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);

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
  bestFor: string;
}> = {
  "dark-enterprise": {
    name: "Dark Enterprise",
    description: "Premium, secure, technical",
    bestFor: "Landing page, dashboard, analytics",
  },
  "light-enterprise": {
    name: "Light Enterprise",
    description: "Clean, modern, trustworthy",
    bestFor: "Docs, blog, pricing pages",
  },
  "gradient-tech": {
    name: "Gradient Tech",
    description: "Cutting-edge, tech-focused",
    bestFor: "Hero visuals, feature highlights",
  },
  "neumorphism": {
    name: "Neumorphism Lite",
    description: "Soft layers, approachable",
    bestFor: "Internal dashboard, tool panels",
  },
  "material": {
    name: "Material IA",
    description: "Professional, accessible",
    bestFor: "Docs, tables, forms, comparison UI",
  },
};
