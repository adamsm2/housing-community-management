import { useMemo } from "react";
import paths from "@/router/paths.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks.ts";
import { selectAuth } from "@/redux/authSlice.ts";
import { logoutUser } from "@/redux/authActions.ts";

const useNavbarItems = () => {
  const user = useAppSelector(selectAuth).user;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userFirstName = user?.firstName;

  const pagesItems = useMemo(() => {
    const items = [
      { name: t("announcements"), onClick: () => navigate(paths.announcements) },
      //{ name: t("contact"), onClick: () => navigate(paths.contact) },
    ];
    if (user) {
      if (user.role === "ROLE_ADMIN") {
        items.push({ name: t("adminPanel"), onClick: () => navigate(paths.admin.root) });
      } else {
        items.push({ name: t("userPanel"), onClick: () => navigate(paths.user.root) });
      }
    }
    return items;
  }, [user, t]);

  const onLogout = async () => {
    await dispatch(logoutUser());
    navigate(paths.auth.login);
  };

  const loginLogoutItem = useMemo(() => {
    return {
      name: user ? t("logout") : t("signIn"),
      onClick: user ? onLogout : () => navigate(paths.auth.login),
    };
  }, [user, t]);

  return { pagesItems, loginLogoutItem, userFirstName };
};


export default useNavbarItems;