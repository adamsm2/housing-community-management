import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import UserApi from "@/api/user.ts";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import registerUserValidationSchema from "@/components/forms/schemas/register-user.ts";
import { CircularProgress } from "@mui/material";
import paths from "@/router/paths.ts";
import { useNavigate } from "react-router-dom";
import FormField from "@/components/forms/FormField.tsx";

type FormFieldProps = {
  name: keyof RegisterUserRequest;
  type: string;
  error: FieldError | undefined;
}

const RegisterUserForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const schema = registerUserValidationSchema();

  const {
    register, handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterUserRequest>({
    resolver: yupResolver(schema),
  });

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "firstName", type: "text", error: errors.firstName },
      { name: "lastName", type: "text", error: errors.lastName },
      { name: "email", type: "email", error: errors.email },
      { name: "password", type: "password", error: errors.password },
      { name: "passwordRepeated", type: "password", error: errors.passwordRepeated },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<RegisterUserRequest> = (data) => {
    setIsLoading(true);
    UserApi.registerUser(data)
      .then(() => {
        setMessage(t("registeredSuccessfully"));
      })
      .catch((error) => {
        error.response ? setMessage(t("userExists")) : setMessage(t("internalError"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setValues = () => {
    setValue("email", "abc@gmail.com");
    setValue("password", "password123");
    setValue("passwordRepeated", "password123");
    setValue("firstName", "John");
    setValue("lastName", "John");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 max-w-xl sm:mt-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6">
        {formFields.map((item) => (
          <div key={item.name}>
            <FormField name={item.name} translatedName={t(item.name)} type={item.type} register={register}
                       error={item.error?.message} />
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        {message && <p>{message}</p>}
      </div>
      <div className="mt-10">
        {isLoading ? <div className="text-center mb-0"><CircularProgress /></div> :
          <>
            <button
              type="submit"
              className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryHover"
            >
              {t("createResidentAccount")}
            </button>
            <button
              onClick={() => navigate(paths.auth.login)}
              className="mt-2 block w-full px-3.5 py-2.5 text-center text-sm font-semibold text-textTitle underline hover:text-primaryHover"
            >
              {t("backToLoginPage")}
            </button>
            <button type="button" onClick={setValues}>Set Values</button>
          </>}
      </div>
    </form>
  )
    ;
};

export default RegisterUserForm;