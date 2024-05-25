import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import paths from "@/router/paths.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import UserApi from "@/api/user.ts";

const ProtectedRoute: React.FC<PropsWithChildren> = () => {
  const accessTokenExpirationDate = localStorage.getItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
  const isAccessTokenExpired = accessTokenExpirationDate ? parseInt(accessTokenExpirationDate, 10) < new Date().getTime() : true;
  if (isAccessTokenExpired && localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
    UserApi.refreshToken()
      .then(() => {
        return <><Outlet /></>;
      })
      .catch(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        return <Navigate to={paths.auth.login} />;
      });
  }

  if (!isAccessTokenExpired) {
    return <><Outlet /></>;
  } else {
    return <Navigate to={paths.auth.login} />;
  }
};

export default ProtectedRoute;