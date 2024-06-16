import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ENGLISH, Language, POLISH } from "../locale/languages.ts";
import localStorageKeys from "@/localstorage-keys.ts";

const getLanguageFromCode = (code: string): Language => {
  switch (code) {
    case "pl":
      return POLISH;
    case "en":
      return ENGLISH;
    default:
      return POLISH;
  }
};

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [isPolishSelected, setIsPolishSelected] = useState(
    getLanguageFromCode(localStorage.getItem("language") ?? "pl") === POLISH,
  );
  const language = isPolishSelected ? ENGLISH : POLISH;

  const handleClick = () => {
    localStorage.setItem(localStorageKeys.LANGUAGE, language.code);
    i18n.changeLanguage(language.code)
      .then(() => setIsPolishSelected(!isPolishSelected))
      .catch((error) => console.error(error));
  };

  return (
    <img src={language.flagIcon} onClick={handleClick} alt="language switch"
         className="iconButton" />
  );
};

export default LanguageSwitch;