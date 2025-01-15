import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute.tsx";
import LoginPage from "@/pages/Auth/LoginPage.tsx";
import RegisterPage from "@/pages/Auth/RegisterPage.tsx";
import AuthRoute from "@/router/AuthRoute.tsx";
import paths from "@/router/paths.ts";
import RootLayout from "@/components/layout/RootLayout.tsx";
import HomePage from "@/pages/Home/HomePage.tsx";
import VerifyEmailPage from "@/pages/Auth/VerifyEmailPage.tsx";
import MeterReadingsPage from "@/pages/User/MeterReadingsPage.tsx";
import ApartmentsListPage from "@/pages/Admin/ApartmentsListPage.tsx";
import AdminPanelNavigation from "@/components/layout/AdminPanelNavigation.tsx";
import UserPanelNavigation from "@/components/layout/UserPanelNavigation.tsx";
import CreateApartmentPage from "@/pages/Admin/CreateApartmentPage.tsx";
import ProtectedAdminRoute from "@/router/ProtectedAdminRoute.tsx";
import CreateAnnouncementPage from "@/pages/Admin/CreateAnnouncementPage.tsx";
import SetUtilityPricesPage from "@/pages/Admin/SetUtilityPricesPage.tsx";
import UpdateMeterReadingsPage from "@/pages/Admin/UpdateMeterReadingsPage.tsx";
import AnnouncementsPage from "@/pages/Announcement/AnnouncementsPage.tsx";

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
      { path: paths.announcements, element: <AnnouncementsPage /> },
      { path: paths.contact, element: <div className="mt-36">Contact</div> },
      {
        path: paths.user.root,
        element: (
          <ProtectedRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            element: <UserPanelNavigation />,
            children: [
              { index: true, element: <MeterReadingsPage /> },
              { path: paths.user.upcomingCharges, element: <div className="mt-36">Meters</div> },
            ],
          },
        ],
      },
      {
        path: paths.admin.root,
        element: (
          <ProtectedAdminRoute>
          </ProtectedAdminRoute>
        ),
        children: [
          {
            element: <AdminPanelNavigation />,
            children: [
              { index: true, element: <ApartmentsListPage /> },
              { path: paths.admin.createApartment, element: <CreateApartmentPage /> },
              { path: paths.admin.createAnnouncement, element: <CreateAnnouncementPage /> },
              { path: paths.admin.setUtilityPrices, element: <SetUtilityPricesPage /> },
              { path: paths.admin.updateMeterReadings, element: <UpdateMeterReadingsPage /> },
            ],
          },
        ],
      },
      { path: paths.root, element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);

export default router;