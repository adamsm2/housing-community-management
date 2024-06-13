import { FC, PropsWithChildren } from "react";

const ThemeProvider: FC<PropsWithChildren> = (props) => {
  if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  return (
    <>
      {props.children}
    </>
  );
};

export default ThemeProvider;