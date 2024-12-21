import * as yup from "yup";
import { useTranslation } from "react-i18next";

const createApartmentValidationSchema = () => {
  const { t } = useTranslation();

  const schema = {
    number: yup
      .number()
      .min(0, "minNumber")
      .required(t("numberRequired")),
    squareFootage: yup
      .number()
      .min(1, t("minSquareFootage"))
      .required(t("squareFootageRequired")),
    ownerEmail: yup
      .string()
      .email(t("validEmail"))
      .max(100, t("maxEmailLength"))
      .required(t("emailRequired")),
  };

  return yup.object().shape({
    ...schema,
  }).required();
};

export default createApartmentValidationSchema;