import userCredentialsValidationSchema from "@/components/forms/schemas/user-credentials.ts";
import * as yup from "yup";

const loginUserValidationSchema = () => {
  const schema = userCredentialsValidationSchema();

  return yup.object().shape({
    ...schema,
  }).required();
};

export default loginUserValidationSchema;