import { useTranslation } from "react-i18next";
import { NavigateButtonProps } from "@/components/ui/NavigateButton.tsx";
import paths from "@/router/paths.ts";
import PanelNavigation from "@/components/layout/PanelNavigation.tsx";
import { Outlet } from "react-router-dom";

const AdminPanelNavigation = () => {
  const { t } = useTranslation();
  const buttons: NavigateButtonProps[] = [
    { name: t("apartmentsList"), path: paths.admin.root },
    { name: t("createApartment"), path: paths.admin.createApartment },
    { name: t("createAnnouncement"), path: paths.admin.createAnnouncement },
    { name: t("setUtilityPrices"), path: paths.admin.setUtilityPrices },
    { name: t("updateMeterReadings"), path: paths.admin.updateMeterReadings },
  ];
  return (
    <>
      <PanelNavigation buttons={buttons} />
      <Outlet />
    </>
  );
};

export default AdminPanelNavigation;