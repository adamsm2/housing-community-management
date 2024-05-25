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
import SelectLanguage from "@/components/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";
import SelectTheme from "@/components/SelectTheme.tsx";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const navbarItems = [
    { name: t("login"), path: paths.auth.login },
    { name: t("announcements"), path: paths.announcements },
    { name: t("userPanel"), path: paths.user.root },
  ];

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
                    onClick={() => navigate(item.path)}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: colors.primary200, boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" }, color: colors.text }}
            >
              <MenuIcon />
            </IconButton>
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
            <Box sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              marginLeft: "auto",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              {navbarItems.map((item, index) => (
                <Typography key={index} onClick={() => navigate(item.path)}
                            sx={{
                              cursor: "pointer",
                              color: colors.text,
                              fontWeight: "bold",
                              transition: "color 0.3s ease",
                              "&:hover": { color: "hsl(28,88%,62%)" },
                            }}>
                  {item.name}
                </Typography>
              ))}
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
              display: { xs: "block", sm: "none" },
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