import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import paths from "@/router/paths.ts";
import { useAppSelector } from "@/hooks/reduxHooks.ts";
import { selectAuth } from "@/redux/authSlice.ts";

const ProtectedRoute: FC<PropsWithChildren> = () => {
  const auth = useAppSelector(selectAuth);

  if (auth.accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to={paths.auth.login} />;
  }
};

export default ProtectedRoute;