export const THEME_STORAGE_KEY = "mot7km-theme";

export const themes = {
  light: {
    name: "light",
    label: "Light",
  },
  dark: {
    name: "dark",
    label: "Dark",
  },
  system: {
    name: "system",
    label: "System",
  },
} as const;

export type ThemeName = keyof typeof themes;
