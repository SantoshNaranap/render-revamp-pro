
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light';
type ThemeColor = 'default' | 'blue' | 'green' | 'purple' | 'orange' | 'red';

interface ThemeContextType {
  themeColor: ThemeColor;
  themeMode: ThemeMode;
  setThemeColor: (color: ThemeColor) => void;
  setThemeMode: (mode: ThemeMode) => void;
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

const lightThemeVariables = {
  background: '0 0% 100%',
  foreground: '240 10% 3.9%',
  card: '0 0% 100%',
  cardForeground: '240 10% 3.9%',
  popover: '0 0% 100%',
  popoverForeground: '240 10% 3.9%',
  secondary: '240 4.8% 95.9%',
  secondaryForeground: '240 5.9% 10%',
  muted: '240 4.8% 95.9%',
  mutedForeground: '240 3.8% 46.1%',
  accent: '240 4.8% 95.9%',
  accentForeground: '240 5.9% 10%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '0 0% 98%',
  border: '240 5.9% 90%',
  input: '240 5.9% 90%',
  sidebarBackground: '0 0% 98%',
  sidebarForeground: '240 5.3% 26.1%',
  sidebarAccent: '240 4.8% 95.9%',
  sidebarAccentForeground: '240 5.9% 10%',
  sidebarBorder: '240 5.9% 90%',
};

const darkThemeVariables = {
  background: '240 10% 3.9%',
  foreground: '0 0% 98%',
  card: '240 10% 5.9%',
  cardForeground: '0 0% 98%',
  popover: '240 10% 5.9%',
  popoverForeground: '0 0% 98%',
  secondary: '240 4.8% 18.9%',
  secondaryForeground: '0 0% 98%',
  muted: '240 4.8% 15.9%',
  mutedForeground: '240 5% 74.9%',
  accent: '240 4.8% 18.9%',
  accentForeground: '0 0% 98%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '0 0% 98%',
  border: '240 3.7% 18.9%',
  input: '240 3.7% 18.9%',
  sidebarBackground: '240 10% 3.9%',
  sidebarForeground: '0 0% 98%',
  sidebarAccent: '240 4.8% 18.9%',
  sidebarAccentForeground: '0 0% 98%',
  sidebarBorder: '240 3.7% 18.9%',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem('app-theme-color');
    return (savedColor as ThemeColor) || 'default';
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('app-theme-mode');
    return (savedMode as ThemeMode) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('app-theme-color', themeColor);
    localStorage.setItem('app-theme-mode', themeMode);
    
    const root = document.documentElement;
    const colors = themeColors[themeColor];
    
    // Set primary colors for all themes
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    root.style.setProperty('--sidebar-primary', colors.primary);
    root.style.setProperty('--sidebar-primary-foreground', colors.primaryForeground);
    root.style.setProperty('--ring', colors.primary);
    root.style.setProperty('--sidebar-ring', colors.primary);

    // Apply theme mode variables
    const modeVariables = themeMode === 'light' ? lightThemeVariables : darkThemeVariables;
    Object.entries(modeVariables).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });
  }, [themeColor, themeMode]);

  return (
    <ThemeContext.Provider value={{ themeColor, themeMode, setThemeColor, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
