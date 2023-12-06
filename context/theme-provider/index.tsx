'use client';
import type { ThemeMode } from '@/types';
import React, { useEffect } from 'react';
import type { ThemeContext, ThemeValue } from './types';

const themeContext = React.createContext< ThemeContext | null>(null);

const setDarkTheme = () => {
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
};
const setLightTheme = () => {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
};

const themeReducer = (state:ThemeValue, type:ThemeMode) => {
  switch (type) {
    case 'dark':{
      setDarkTheme();
      return {
        ...state,
        theme: type,
        mode: type
      };
    }
    case 'light':{
      setLightTheme();
      return {
        ...state,
        theme: type,
        mode: type
      };
    }
    case 'system':{
      const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
      const isDark = themeMedia.matches;
      const theme = isDark ? 'dark' as const : 'light' as const;
      if (isDark) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
      return {
        ...state,
        theme,
        mode: type
      };
    }
    default: {
      throw new Error('unknown theme mode');
    }
  }
};

export const ThemeProvider = ({ children }:{ children:React.ReactNode }) => {
  const [themeValue, dispatch] = React.useReducer(themeReducer, { mode: 'system', theme: 'dark' });

  const setThemeMode = (mode:ThemeMode) => {
    window.localStorage.setItem('theme', mode);
    dispatch(mode);
  };

  useEffect(() => {
    const mode = window.localStorage.getItem('theme') as ThemeMode;
    setThemeMode(mode ?? 'system');
  }, []);

  const value = React.useMemo(() => ({ themeValue, setThemeMode }), [themeValue]);
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
