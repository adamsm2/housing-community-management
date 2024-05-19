import SelectLanguage from "../components/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";
import SelectTheme from "../components/SelectTheme.tsx";
import * as yup from "yup";
import { apiClient } from "../api/apiClient.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const schema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .max(100, "Email must be at most 255 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),
  passwordRepeated: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Repeated password is required"),
}).required();

const MainPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const testApi = () => {
    apiClient
      .get("/test/frontend")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };

  const onSubmit: SubmitHandler<RegisterUserRequest> = (data) => {
    setIsLoading(true);
    apiClient
      .post("/users/register", data)
      .then((response) => {
        console.log(response.data);
        console.log("Response:  ", response);
      })
      .catch((error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterUserRequest>({
    resolver: yupResolver(schema),
  });

  const email = watch("email");
  const password = watch("password");
  const passwordRepeated = watch("passwordRepeated");
  useEffect(() => {
    setMessage("");
  }, [email, password, passwordRepeated]);


  return (
    <>
      <h1>{t("home")}</h1>
      <SelectLanguage />
      <SelectTheme />
      <button onClick={testApi}>Test</button>
      {isLoading ? <div><CircularProgress /></div> :
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
          <div>
            <label htmlFor="passwordRepeated">Password repeated</label>
            <input id="passwordRepeated" type="password" {...register("passwordRepeated")} />
            {errors.passwordRepeated && <p>{errors.passwordRepeated.message}</p>}
          </div>
          {message && <p>{message}</p>}
          <button type="submit">Register</button>
        </form>
      }
    </>
  );
};

export default MainPage;