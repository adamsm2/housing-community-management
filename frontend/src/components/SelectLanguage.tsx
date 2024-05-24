import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ENGLISH, Language, POLISH } from "../locale/languages.ts";
import english from "../assets/english-flag.png";
import polish from "../assets/polish-flag.png";
import localStorageKeys from "@/localstorage-keys.ts";


const SelectLanguage = () => {
  const { i18n } = useTranslation();

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

  const [selectedLanguage, setSelectedLanguage] = useState(
    getLanguageFromCode(localStorage.getItem("language") ?? "pl"),
  );


  const handleLanguageSelect = (language: Language) => {
    localStorage.setItem(localStorageKeys.LANGUAGE, language.code);
    i18n.changeLanguage(language.code)
      .then(() => setSelectedLanguage(language))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <img src={english} alt="english-flag"
           onClick={() => ENGLISH.code !== selectedLanguage.code ? handleLanguageSelect(ENGLISH) : null} />
      <img src={polish} alt="polish-flag"
           onClick={() => POLISH.code !== selectedLanguage.code ? handleLanguageSelect(POLISH) : null} />
    </>

  );
};

export default SelectLanguage;