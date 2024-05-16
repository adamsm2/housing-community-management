import SelectLanguage from "../components/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";
import SelectTheme from "../components/SelectTheme.tsx";

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("home")}</h1>
      <SelectLanguage />
      <SelectTheme />
    </div>
  );
};

export default MainPage;