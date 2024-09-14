import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import registerUserValidationSchema from "@/components/forms/schemas/register-user.ts";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { registerUser } from "@/redux/authActions.ts";
import AppForm from "@/components/forms/AppForm.tsx";
import NavigateFormButton from "@/components/ui/NavigateFormButton.tsx";
import paths, { getPathWithParams } from "@/router/paths.ts";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import { useNavigate } from "react-router-dom";

type FormFieldProps = {
  name: keyof RegisterUserRequest;
  type: "password" | "text" | "email";
  error: FieldError | undefined;
}

const RegisterUserForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const schema = registerUserValidationSchema();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<RegisterUserRequest> = async (data) => {
    setIsLoading(true);
    const response = await dispatch(registerUser(data));
    if (response.error) {
      toast.error(t("userExists"));
    } else {
      navigate(getPathWithParams(paths.auth.verifyEmail, { email: data.email }));
      toast.success(t("registeredSuccessfully"));
    }
    setIsLoading(false);
  };

  const setValues = () => {
    setValue("email", "abc@gmail.com");
    setValue("password", "password123");
    setValue("passwordRepeated", "password123");
    setValue("firstName", "John");
    setValue("lastName", "John");
  };

  return (
    <AppForm formFields={formFields} register={register} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading}>
      <>
        <SubmitFormButton name={t("createResidentAccount")} />
        <NavigateFormButton path={paths.auth.login} name={t("backToLogin")} />
        <button type="button" onClick={setValues}>Set Values</button>
      </>
    </AppForm>
  );
};

export default RegisterUserForm;