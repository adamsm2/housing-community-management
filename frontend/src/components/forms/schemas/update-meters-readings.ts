import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const UpdateMetersReadingsValidationSchema = () => {
  const { t } = useTranslation();

  const schema = {
    electricityMeterReading: yup
      .number()
      .min(0, "provideValueGreaterThanZero")
      .required(t("fieldRequired")),
    waterMeterReading: yup
      .number()
      .min(1, t("provideValueGreaterThanZero"))
      .required(t("fieldRequired")),
  };

  return yup.object().shape({
    ...schema,
  }).required();
};

export default UpdateMetersReadingsValidationSchema;