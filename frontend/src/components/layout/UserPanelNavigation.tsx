import { NavigateButtonProps } from "@/components/ui/NavigateButton.tsx";
import paths from "@/router/paths.ts";
import PanelNavigation from "@/components/layout/PanelNavigation.tsx";
import { Outlet } from "react-router-dom";

const UserPanelNavigation = () => {
  const buttons: NavigateButtonProps[] = [
    { name: "Stany liczników", path: paths.user.root },
    { name: "PRZEWIDYWANE CENY / Nadchodzące opłaty/ upcoming charges", path: paths.user.upcomingCharges },
  ];
  return (
    <>
      <PanelNavigation buttons={buttons} />
      <Outlet />
    </>
  );
};

export default UserPanelNavigation;