import type { Theme, ThemeMode } from '@/types';
export type ThemeValue = {
  theme:Theme
  mode:ThemeMode
};
export type ThemeContext = {
  themeValue
  setThemeMode:(value:ThemeMode) => void
};
