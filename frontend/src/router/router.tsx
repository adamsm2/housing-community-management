import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute.tsx";
import MainPage from "@/pages/MainPage.tsx";
import Navbar from "@/components/layout/Navbar.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import UserPanelMainPage from "@/pages/user/UserPanelMainPage.tsx";
import UserMetersPage from "@/pages/user/UserMetersPage.tsx";
import AnnouncementsPage from "@/pages/AnnouncementsPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import AuthRoute from "@/router/AuthRoute.tsx";
import paths from "@/router/paths.ts";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Navbar />,
    children: [
      {
        path: paths.auth.root,
        element: (
          <AuthRoute>
          </AuthRoute>
        ),
        children: [
          { path: paths.auth.login, element: <LoginPage /> },
          { path: paths.auth.register, element: <RegisterPage /> },
        ],
      },
      { path: paths.announcements, element: <AnnouncementsPage /> },
      {
        path: paths.user.root,
        element: (
          <ProtectedRoute>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <UserPanelMainPage /> },
          { path: paths.user.meters, element: <UserMetersPage /> },
        ],
      },
      { path: paths.root, element: <MainPage /> },
      { path: "*", element: <MainPage /> },
    ],
  },
]);

export default router;