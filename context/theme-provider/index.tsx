'use client';
import { useLocalStorage } from '@/hooks/uselocalStorage';
import type { Theme, ThemeMode } from '@/types';
import React from 'react';
import type { ThemeContext } from './types';

const themeContext = React.createContext< ThemeContext | null>(null);

const setDarkTheme = () => {
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
};
const setLightTheme = () => {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
};

const getSystemTheme = () => {
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = themeMedia.matches;
  return isDark ? 'dark' : 'light';
};
export const ThemeProvider = ({ children }:{ children:React.ReactNode }) => {
  const [mode, setMode] = useLocalStorage<ThemeMode>('theme', 'system');
  const [theme, setTheme] = React.useState<Theme>('dark');

  const setThemeMode = React.useCallback((value:ThemeMode) => setMode(value), [setMode]);

  React.useEffect(() => {
    if (mode === 'dark') {
      setTheme('dark');
      setDarkTheme();
    }
    if (mode === 'light') {
      setTheme('light');
      setLightTheme();
    }
    if (mode === 'system') {
      const systemMode = getSystemTheme();
      systemMode === 'dark' ? setDarkTheme() : setLightTheme();
      setTheme(systemMode);
    }
  }, [mode]);

  const value = React.useMemo(() => ({ themeValue: { theme, mode }, setThemeMode }), [mode, theme, setThemeMode]);

  return (
    <themeContext.Provider value={value}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(themeContext);
  if (!context) { throw new Error('useTheme must be used within a ThemeProvider'); }
  return context;
};
