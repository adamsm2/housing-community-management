import { useContext, useMemo } from "react";
import { UserContext } from "@/store/UserContext.tsx";
import paths from "@/router/paths.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserApi from "@/api/user.ts";

const useNavbarItems = () => {
  const { userData, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userFirstName = userData.firstName;

  const pagesItems = useMemo(() => {
    const items = [
      { name: t("announcements"), onClick: () => navigate(paths.announcements) },
      { name: t("contact"), onClick: () => navigate(paths.contact) },
    ];
    if (userData.role !== "") {
      items.push({ name: t("userPanel"), onClick: () => navigate(paths.user.root) });
    }
    return items;
  }, [userData, t]);

  const logoutUser = () => {
    UserApi.logoutUser()
      .then(() => {
        setCurrentUser({ "email": "", "firstName": "", "lastName": "", "role": "" });
        navigate(paths.auth.login);
      });
  };

  const loginLogoutItem = useMemo(() => {
    return {
      name: userData.role === "" ? t("signIn") : t("logout"),
      onClick: userData.role === "" ? () => navigate(paths.auth.login) :
        logoutUser,
    };
  }, [userData, t]);

  return { pagesItems, loginLogoutItem, userFirstName };
};


export default useNavbarItems;