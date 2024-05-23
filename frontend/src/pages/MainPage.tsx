import SelectLanguage from "@/components/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";
import SelectTheme from "@/components/SelectTheme.tsx";
import { apiClient } from "@/api/client.ts";
import RegisterUserForm from "@/components/forms/RegisterUserForm.tsx";

const MainPage = () => {
  const { t } = useTranslation();

  const testApi = () => {
    apiClient
      .get("/test/frontend")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  return (
    <>
      <h1>{t("home")}</h1>
      <SelectLanguage />
      <SelectTheme />
      <button onClick={testApi}>Test</button>
      <RegisterUserForm />
    </>
  );
};

export default MainPage;