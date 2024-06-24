import LoginUserForm from "@/components/forms/LoginUserForm.tsx";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-24 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-textTitle sm:text-4xl">{t("signIn")}</h2>
      </div>
      <LoginUserForm></LoginUserForm>
    </div>
  );
};

export default LoginPage;