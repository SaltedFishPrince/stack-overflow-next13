'use client';
import React from 'react';
import type { ModeType, ThemeContextType } from './types';

const themeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }:{ children:React.ReactNode }) => {
  const [mode, setMode] = React.useState<ModeType>('dark');
  const insetMode = (mode:ModeType) => { setMode(mode); };
  const value = React.useMemo(() => ({ mode, insetMode }), [mode]);

  React.useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [mode]);
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
