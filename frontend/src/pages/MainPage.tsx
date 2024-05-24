import SelectLanguage from "@/components/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";
import SelectTheme from "@/components/SelectTheme.tsx";
import { apiClient } from "@/api/client.ts";
import UserApi from "@/api/user.ts";
import RegisterUserForm from "@/components/forms/RegisterUserForm.tsx";
import LoginUserForm from "@/components/forms/LoginUserForm.tsx";

const MainPage = () => {
  const { t } = useTranslation();

  const testApi = () => {
    const expirationDate = localStorage.getItem("accessTokenExpirationDate") ?? "";
    const currentTime = new Date().getTime();
    console.log("Expiration date: ", expirationDate);
    console.log(parseInt(expirationDate, 10));
    console.log(currentTime);
    console.log(currentTime - parseInt(expirationDate, 10));
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
      <LoginUserForm />
      <button onClick={() => UserApi.logoutUser()}> Logout</button>
    </>
  );
};

export default MainPage;