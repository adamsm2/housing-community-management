import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import loginUserValidationSchema from "@/components/forms/schemas/login-user.ts";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import paths from "@/router/paths.ts";
import FormField from "@/components/forms/FormField.tsx";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { loginUser } from "@/redux/authActions.ts";
import { toast } from "react-toastify";

type FormFieldProps = {
  name: keyof LoginUserRequest;
  type: string;
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
    const response = await dispatch(loginUser(data));
    if (response.error) {
      toast.error(t("invalidCredentials"));
    } else {
      toast.success(t("loginSuccess"));
      navigate(paths.user.root);
    }
    setIsLoading(false);
  };

  const setValues = () => {
    setValue("email", "abc@gmail.com");
    setValue("password", "password123");
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
      <div className="mt-10">
        {isLoading ? <div className="text-center mb-0"><CircularProgress /></div> :
          <>
            <button
              type="submit"
              className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryHover"
            >
              {t("signIn")}
            </button>
            <button
              type="button"
              onClick={() => navigate(paths.auth.register)}
              className="mt-2 block w-full px-3.5 py-2.5 text-center text-sm font-semibold text-textTitle underline hover:text-primaryHover"
            >
              {t("createResidentAccount")}
            </button>
            <button type="button" onClick={setValues}>Set Values</button>
          </>}
      </div>
    </form>
  );

};

export default LoginUserForm;