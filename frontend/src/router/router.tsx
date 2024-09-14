import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute.tsx";
import LoginPage from "@/pages/Auth/LoginPage.tsx";
import RegisterPage from "@/pages/Auth/RegisterPage.tsx";
import AuthRoute from "@/router/AuthRoute.tsx";
import paths from "@/router/paths.ts";
import RootLayout from "@/components/layout/RootLayout.tsx";
import HomePage from "@/pages/Home/HomePage.tsx";
import VerifyEmailPage from "@/pages/Auth/VerifyEmailPage.tsx";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <RootLayout />,
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
          { path: paths.auth.verifyEmail, element: <VerifyEmailPage /> },
        ],
      },
      { path: paths.announcements, element: <div className="mt-36">Announcement</div> },
      { path: paths.contact, element: <div className="mt-36">Contact</div> },
      {
        path: paths.user.root,
        element: (
          <ProtectedRoute>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div className="mt-36">User panel</div> },
          { path: paths.user.meters, element: <div className="mt-36">Meters</div> },
        ],
      },
      { path: paths.root, element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);

export default router;