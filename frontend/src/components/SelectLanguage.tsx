import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ENGLISH, Language, POLISH } from "../locale/languages.ts";
import english from "../assets/english-flag.png";
import polish from "../assets/polish-flag.png";


const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(POLISH);

  const handleLanguageSelect = (language: Language) => {
    i18n.changeLanguage(language.code);
    setSelectedLanguage(language);
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