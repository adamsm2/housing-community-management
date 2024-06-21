import RegisterUserForm from "@/components/forms/RegisterUserForm.tsx";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-24 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-textTitle sm:text-4xl">{t("createResidentAccount")}</h2>
        <p className="mt-2 text-lg leading-8 text-textContent">
          {t("infoAboutCreatingAccount")}
        </p>
      </div>
      <RegisterUserForm />
    </div>
  );
};

export default RegisterPage;