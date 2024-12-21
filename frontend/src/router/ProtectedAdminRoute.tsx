import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "@/hooks/reduxHooks.ts";
import { selectAuth } from "@/redux/authSlice.ts";
import { Navigate, Outlet } from "react-router-dom";
import paths from "@/router/paths.ts";

const ProtectedAdminRoute: FC<PropsWithChildren> = () => {
  const auth = useAppSelector(selectAuth);

  if (auth.accessToken && auth.user?.role === "ROLE_ADMIN") {
    return <Outlet />;
  } else {
    return <Navigate to={paths.auth.login} />;
  }
};

export default ProtectedAdminRoute;