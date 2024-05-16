import { useContext } from "react";
import { Theme } from "../themes/themes.types.ts";
import { ThemeContext } from "../store/ThemeContext.tsx";

const SelectTheme = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <>
      {theme === Theme.DARK ? (
        <button onClick={toggleTheme}
                style={{ backgroundColor: colors.background, color: colors.primary, borderColor: colors.secondary }}>
          {Theme.LIGHT}
        </button>
      ) : (
        <button onClick={toggleTheme}
                style={{ backgroundColor: colors.background, color: colors.primary, borderColor: colors.secondary }}>
          {Theme.DARK}
        </button>
      )}
    </>
  );
};

export default SelectTheme;