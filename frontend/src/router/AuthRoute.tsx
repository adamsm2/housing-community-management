import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import paths from "@/router/paths.ts";
import localStorageKeys from "@/localstorage-keys.ts";

const AuthRoute: React.FC<PropsWithChildren> = () => {
  const accessTokenExpirationDate = localStorage.getItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
  const isAccessTokenExpired = accessTokenExpirationDate ? parseInt(accessTokenExpirationDate, 10) < new Date().getTime() : true;

  if (isAccessTokenExpired) {
    return <><Outlet /></>;
  } else {
    return <Navigate to={paths.user.root} />;
  }
};

export default AuthRoute;