import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import loginUserValidationSchema from "@/components/forms/schemas/login-user.ts";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import paths from "@/router/paths.ts";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { getCurrentUserData, loginUser } from "@/redux/authActions.ts";
import { toast } from "react-toastify";
import AppForm from "@/components/forms/AppForm.tsx";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import NavigateFormButton from "@/components/ui/NavigateFormButton.tsx";

type FormFieldProps = {
  name: keyof LoginUserRequest;
  type: "email" | "password";
  error: FieldError | undefined;
}

const LoginUserForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const schema = loginUserValidationSchema();
  const dispatch = useAppDispatch();

  const {
    register, handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginUserRequest>({
    resolver: yupResolver(schema),
  });

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "email", type: "email", error: errors.email },
      { name: "password", type: "password", error: errors.password },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<LoginUserRequest> = async (data) => {
    setIsLoading(true);
    const loginResponse = await dispatch(loginUser(data));
    if (loginResponse.error) {
      toast.error(t("invalidCredentials"));
    } else {
      toast.success(t("loginSuccess"));
      await dispatch(getCurrentUserData());
      navigate(paths.user.root);
    }
    setIsLoading(false);
  };

  const setValues = () => {
    setValue("email", "abc@gmail.com");
    setValue("password", "password123");
  };

  return (
    <AppForm formFields={formFields} isLoading={isLoading} onSubmit={handleSubmit(onSubmit)} register={register}>
      <>
        <SubmitFormButton name={t("signIn")} />
        <NavigateFormButton name={t("createResidentAccount")} path={paths.auth.register} />
        <button type="button" onClick={setValues}>Set Values</button>
      </>
    </AppForm>
  );

};

export default LoginUserForm;