export type ModeType = 'light' | 'dark';

export type ThemeContextType = {
  mode:ModeType
  insetMode:(mode:ModeType) => void
};
