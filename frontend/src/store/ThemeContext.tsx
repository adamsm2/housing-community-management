import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Theme } from "../themes/themes.types.ts";
import { darkTheme, lightTheme } from "../themes/themes.ts";
import { ThemeContextType } from "./ThemeContext.types.ts";

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.LIGHT,
  colors: lightTheme,
  toggleTheme: () => "",
});

export const ThemeContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? Theme.LIGHT;
  });

  const toggleTheme = () => {
    if (theme === Theme.DARK) {
      setTheme(Theme.LIGHT);
      return Theme.LIGHT;
    }
    setTheme(Theme.DARK);
    return Theme.DARK;
  };

  const getColors = () => {
    if (theme === Theme.DARK) {
      return darkTheme;
    }
    return lightTheme;
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    colors: getColors(),
    toggleTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};