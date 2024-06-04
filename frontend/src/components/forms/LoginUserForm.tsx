import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import useLoginUserValidationSchema from "@/components/forms/schemas/login-user.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import UserApi from "@/api/user.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import paths from "@/router/paths.ts";
import { UserContext } from "@/store/UserContext.tsx";

const LoginUserForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const schema = useLoginUserValidationSchema();
  const { setCurrentUser } = useContext(UserContext);

  const onSubmit: SubmitHandler<LoginUserRequest> = async (data) => {
    setIsLoading(true);
    UserApi.loginUser(data)
      .then((userData) => {
        setCurrentUser(userData);
        navigate(paths.user.root);
      })
      .catch((error) => {
        error.response ? setMessage(t("invalidCredentials")) : setMessage(t("internalError"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const {
    register, handleSubmit,
    setValue, reset,
    formState: { errors }, watch,
  } = useForm<LoginUserRequest>({
    resolver: yupResolver(schema),
  });

  const email = watch("email");
  const password = watch("password");
  useEffect(() => {
    setMessage("");
  }, [email, password]);

  const setValues = () => {
    setValue("email", "abc@gmail.com");
    setValue("password", "password123");
  };

  const clearForm = () => {
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {isLoading ? <div><CircularProgress /></div> :
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {message && <p>{message}</p>}
            <button type="submit">Login</button>
            <button type="button" onClick={setValues}>Set Values</button>
            <button type="button" onClick={clearForm}>Clear Form</button>
          </form>
          <button onClick={() => navigate(paths.auth.register)}>{t("createNewAccount")}</button>
        </>
      }
    </>
  );

};

export default LoginUserForm;