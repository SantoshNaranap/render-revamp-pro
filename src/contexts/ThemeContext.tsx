
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'default' | 'blue' | 'green' | 'purple' | 'orange' | 'red';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themeColors = {
  default: {
    primary: '262 83% 58%',
    primaryForeground: '0 0% 98%',
  },
  blue: {
    primary: '221 83% 53%',
    primaryForeground: '0 0% 98%',
  },
  green: {
    primary: '142 76% 36%',
    primaryForeground: '0 0% 98%',
  },
  purple: {
    primary: '271 81% 56%',
    primaryForeground: '0 0% 98%',
  },
  orange: {
    primary: '25 95% 53%',
    primaryForeground: '0 0% 98%',
  },
  red: {
    primary: '0 84% 60%',
    primaryForeground: '0 0% 98%',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as Theme) || 'default';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    
    const root = document.documentElement;
    const colors = themeColors[theme];
    
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    root.style.setProperty('--sidebar-primary', colors.primary);
    root.style.setProperty('--sidebar-primary-foreground', colors.primaryForeground);
    root.style.setProperty('--ring', colors.primary);
    root.style.setProperty('--sidebar-ring', colors.primary);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
