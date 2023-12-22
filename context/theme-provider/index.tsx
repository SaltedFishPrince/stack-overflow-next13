'use client';
import React from 'react';
import Cookies from 'js-cookie'
type ThemeContext = {
  isDark: boolean
  toggleTheme: (event: React.MouseEvent) => void
};

const themeContext = React.createContext<ThemeContext | null>(null);



export const ThemeProvider = ({ children, theme }: { children: React.ReactNode, theme: string }) => {
  const [isDark, setIsDark] = React.useState(() => theme === 'dark')
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
    Cookies.set('theme', isDark ? 'dark' : 'light')
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

