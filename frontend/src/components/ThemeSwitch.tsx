import { useState } from "react";
import localStorageKeys from "@/localstorage-keys.ts";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const ThemeSwitch = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(document.documentElement.getAttribute("data-theme") === "dark");
  const toggleTheme = () => {
    if (isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem(localStorageKeys.THEME, "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem(localStorageKeys.THEME, "dark");
    }
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      {isDarkTheme ?
        <SunIcon onClick={toggleTheme} className="iconButton" /> :
        <MoonIcon onClick={toggleTheme} className="iconButton" />}
    </>
  );
};

export default ThemeSwitch;