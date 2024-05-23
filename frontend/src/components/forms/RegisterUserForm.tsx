import { SubmitHandler, useForm } from "react-hook-form";
import UserApi from "@/api/user.ts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import useValidationSchema from "@/pages/schemas/register-user.ts";
import { CircularProgress } from "@mui/material";

const RegisterUserForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const schema = useValidationSchema();

  const onSubmit: SubmitHandler<RegisterUserRequest> = async (data) => {
    setIsLoading(true);
    UserApi.registerUser(data)
      .then((response) => {
        console.log(response);
        setMessage(t("registeredSuccessfully"));
      })
      .catch((error) => {
        error.response ? setMessage(t("userExists")) : setMessage(t("internalError"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const {
    register, handleSubmit,
    setValue, reset,
    formState: { errors }, watch,
  } = useForm<RegisterUserRequest>({
    resolver: yupResolver(schema),
  });

  const email = watch("email");
  const password = watch("password");
  const passwordRepeated = watch("passwordRepeated");
  useEffect(() => {
    setMessage("");
  }, [email, password, passwordRepeated]);

  const setValues = () => {
    setValue("email", "abc@gmail.com");
    setValue("password", "password123");
    setValue("passwordRepeated", "password123");
  };

  const clearForm = () => {
    reset({
      email: "",
      password: "",
      passwordRepeated: "",
    });
  };

  return (
    <>
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
          <button type="button" onClick={setValues}>Set Values</button>
          <button type="button" onClick={clearForm}>Clear Form</button>
        </form>
      }
    </>
  );
};

export default RegisterUserForm;