import useUserCredentialsValidationSchema from "@/components/forms/schemas/user-credentials.ts";
import * as yup from "yup";

const useLoginUserValidationSchema = () => {
  const schema = useUserCredentialsValidationSchema();

  return yup.object().shape({
    ...schema,
  }).required();
};

export default useLoginUserValidationSchema;