import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./locale/translations";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("language") ?? "pl",
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
  resources: translations,
});

export default i18n;