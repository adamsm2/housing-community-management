import SelectLanguage from "../components/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("home")}</h1>
      <SelectLanguage />
    </div>
  );
};

export default MainPage;