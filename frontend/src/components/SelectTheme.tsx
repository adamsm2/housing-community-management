import { useContext } from "react";
import { Theme } from "../themes/themes.types.ts";
import { ThemeContext } from "../store/ThemeContext.tsx";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const SelectTheme = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <IconButton size="medium" onClick={toggleTheme} sx={{ margin: 0, padding: 0 }}>
      {theme === Theme.DARK ? (
        <DarkModeIcon sx={{ color: colors.text }} />
      ) : (
        <LightModeIcon sx={{ color: colors.text }} />
      )}
    </IconButton>
  );

};

export default SelectTheme;