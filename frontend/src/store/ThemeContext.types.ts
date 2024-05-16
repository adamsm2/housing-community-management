import { Palette } from "../themes/themes.types.ts";

export interface ThemeContextType {
  theme: string;
  colors: Palette;
  toggleTheme: () => string;
}