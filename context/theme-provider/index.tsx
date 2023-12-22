'use client';
import React from 'react';

type ThemeContext = {
  isDark: boolean
  toggleTheme: (event: React.MouseEvent) => void
};



const themeContext = React.createContext<ThemeContext | null>(null);


const determineCurrentTheme = () => {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const setting = localStorage.getItem('color-schema') || 'auto';
  return setting === 'dark' || (prefersDark && setting !== 'light')
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = React.useState(() => determineCurrentTheme())
  const toggleTheme = (event: React.MouseEvent) => {
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      setIsDark(!isDark)
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
      setIsDark(!isDark)
    });
    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: !isDark
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            pseudoElement: !isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        );
      });
  };

  React.useEffect(() => {
    localStorage.setItem('color-schema', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])
  const value = React.useMemo(() => ({
    isDark: isDark,
    toggleTheme: toggleTheme
  }), [isDark])
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

