import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "@/store/ThemeContext.tsx";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import paths from "@/router/paths.ts";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/store/UserContext.tsx";
import UserApi from "@/api/user.ts";
import SelectTheme from "@/components/SelectTheme.tsx";
import SelectLanguage from "@/components/SelectLanguage.tsx";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const { userData, setCurrentUser } = useContext(UserContext);

  const logoutUser = () => {
    UserApi.logoutUser()
      .then(() => {
        setCurrentUser({ "email": "", "firstName": "", "lastName": "", "role": "" });
        navigate(paths.auth.login);
      });
  };
  const navbarItems = [
    { name: t("announcements"), onClick: () => navigate(paths.announcements) },
  ];

  if (userData.role !== "") {
    navbarItems.push({ name: t("userPanel"), onClick: () => navigate(paths.user.root) });
  }

  const loginLogoutItem = {
    name: userData.role === "" ? t("login") : t("logout"),
    onClick: userData.role === "" ? () => navigate(paths.auth.login) :
      logoutUser,
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography fontFamily={"Dancing Script, cursive"} variant="h6"
                  sx={{
                    color: colors.text,
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                    "&:hover": { color: colors.highlight },
                  }}>
        HousingCommunity
      </Typography>
      <Divider />
      <List>
        {navbarItems.map((item, index) => (
          <ListItem key={index} disablePadding
                    sx={{
                      color: colors.text,
                      cursor: "pointer",
                    }}
                    onClick={item.onClick}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: colors.primary200, boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" }, color: colors.text }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography fontFamily={"Dancing Script, cursive"} variant="h4"
                          component="div"
                          onClick={() => navigate("")}
                          sx={{
                            display: { xs: "block" },
                            color: colors.text,
                            cursor: "pointer",
                            transition: "color 0.3s ease",
                            "&:hover": { color: colors.highlight },
                          }}>
                HousingCommunity
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              {navbarItems.map((item, index) => (
                <Typography key={index} onClick={item.onClick}
                            sx={{
                              display: { xs: "none", sm: "none", md: "inline-block" },
                              paddingLeft: "0.5rem",
                              paddingRight: "0.5rem",
                              cursor: "pointer",
                              color: colors.text,
                              fontWeight: "bold",
                              transition: "color 0.3s ease",
                              "&:hover": { color: "hsl(28,88%,62%)" },
                            }}>
                  {item.name}
                </Typography>
              ))}
            </Box>
            <Box sx={{
              flex: 1,
              justifyContent: "flex-end",
              gap: "0.5rem",
              display: { xs: "none", sm: "none", md: "flex" },
              alignItems: "center",
            }}>
              <Typography onClick={loginLogoutItem.onClick}
                          sx={{
                            cursor: "pointer",
                            color: colors.text,
                            fontWeight: "bold",
                            transition: "color 0.3s ease",
                            "&:hover": { color: "hsl(28,88%,62%)" },
                          }}>
                {loginLogoutItem.name}
              </Typography>
              <SelectTheme />
              <SelectLanguage />
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      <Outlet />
    </>
  );

};

export default Navbar;