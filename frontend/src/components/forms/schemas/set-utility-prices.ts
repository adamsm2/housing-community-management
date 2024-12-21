import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const SetUtilityPricesValidationSchema = () => {
  const { t } = useTranslation();

  const schema = {
    electricityPricePerUnit: yup
      .number()
      .min(0, "provideValueGreaterThanZero")
      .required(t("fieldRequired")),
    waterPricePerUnit: yup
      .number()
      .min(1, t("provideValueGreaterThanZero"))
      .required(t("fieldRequired")),
  };

  return yup.object().shape({
    ...schema,
  }).required();
};

export default SetUtilityPricesValidationSchema;