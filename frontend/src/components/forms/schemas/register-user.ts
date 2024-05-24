import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useUserCredentialsValidationSchema from "@/components/forms/schemas/user-credentials.ts";

const useRegisterUserValidationSchema = () => {
  const { t } = useTranslation();
  const schema = useUserCredentialsValidationSchema();

  return yup.object().shape({
    ...schema,
    passwordRepeated: yup
      .string()
      .oneOf([yup.ref("password"), ""], t("passwordMatch"))
      .required(t("repeatedPasswordRequired")),
  }).required();

};


export default useRegisterUserValidationSchema;