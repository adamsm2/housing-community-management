import { AppBar, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useContext } from "react";
import { ThemeContext } from "@/store/ThemeContext.tsx";
import paths from "@/router/paths.ts";

const Navbar = () => {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const navbarItems = [
    { name: "Login", path: paths.auth.login },
    { name: "Announcements", path: paths.announcements },
    { name: "User Panel", path: paths.user.root },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: colors.primary200,
          borderBottom: "1px solid",
        }}
      >
        <Toolbar>
          <img src={logo} alt="logo" onClick={() => navigate("")} />
          {navbarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText>
                  {item.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );

};

export default Navbar;