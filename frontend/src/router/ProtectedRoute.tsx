import { PropsWithChildren, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import paths from "@/router/paths.ts";
import { UserContext } from "@/store/UserContext.tsx";

const ProtectedRoute: React.FC<PropsWithChildren> = () => {
  const { userData } = useContext(UserContext);

  if (userData.role !== "") {
    return <Outlet />;
  } else {
    return <Navigate to={paths.auth.login} />;
  }
};

export default ProtectedRoute;