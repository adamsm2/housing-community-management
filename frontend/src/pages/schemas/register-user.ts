import * as yup from "yup";
import { useTranslation } from "react-i18next";

const useValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object({
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
    passwordRepeated: yup
      .string()
      .oneOf([yup.ref("password"), ""], t("passwordMatch"))
      .required(t("repeatedPasswordRequired")),
  }).required();

};


export default useValidationSchema;