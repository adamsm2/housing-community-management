import { useTranslation } from "react-i18next";
import * as yup from "yup";

const useUserCredentialsValidationSchema = () => {
  const { t } = useTranslation();

  return {
    email: yup
      .string()
      .email(t("validEmail"))
      .max(100, t("maxEmailLength"))
      .required(t("emailRequired")),
    password: yup
      .string()
      .min(8, t("minPasswordLength"))
      .max(64, t("maxPasswordLength"))
      .required(t("passwordRequired")),
  };

};

export default useUserCredentialsValidationSchema;