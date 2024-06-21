import * as yup from "yup";
import { useTranslation } from "react-i18next";
import userCredentialsValidationSchema from "@/components/forms/schemas/user-credentials.ts";

const registerUserValidationSchema = () => {
  const { t } = useTranslation();
  const schema = userCredentialsValidationSchema();

  return yup.object().shape({
    ...schema,
    firstName: yup
      .string()
      .required(t("firstNameRequired")),
    lastName: yup
      .string()
      .required(t("lastNameRequired")),
    passwordRepeated: yup
      .string()
      .oneOf([yup.ref("password"), ""], t("passwordMatch"))
      .required(t("repeatedPasswordRequired")),
  }).required();

};


export default registerUserValidationSchema;