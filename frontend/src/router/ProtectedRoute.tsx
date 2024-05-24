import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import paths from "@/router/paths.ts";
import localStorageKeys from "@/localstorage-keys.ts";

const ProtectedRoute: React.FC<PropsWithChildren> = () => {
  const accessTokenExpirationDate = localStorage.getItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
  const isAccessTokenExpired = accessTokenExpirationDate ? new Date(accessTokenExpirationDate) < new Date() : true;

  if (!isAccessTokenExpired) {
    return <><Outlet /></>;
  } else {
    return <Navigate to={paths.auth.login} />;
  }
};

export default ProtectedRoute;