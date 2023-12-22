type ThemeMode = 'light' | 'dark';
type ThemesType = {
  value: ThemeMode
  label: Capitalize<ThemeMode>
  icon: string
};
export const themes: ThemesType[] = [
  { value: 'light', label: 'Light', icon: '/assets/icons/sun.svg' },
  { value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg' },
];
