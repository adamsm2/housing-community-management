import * as yup from "yup";
import { useTranslation } from "react-i18next";

const createAnnouncementValidationSchema = () => {
  const { t } = useTranslation();

  const schema = {
    title: yup
      .string()
      .required()
      .min(3, t("minTitleLength"))
      .max(256, t("maxTitleLength")),
    content: yup
      .string()
      .required()
      .min(3, t("minTitleLength"))
      .max(10000, t("maxContentLength")),
  };

  return yup.object().shape({
    ...schema,
  }).required();
};

export default createAnnouncementValidationSchema;