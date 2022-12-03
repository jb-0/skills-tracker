import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Home"];
const settings = ["Profile", "Logout"];

const ResponsiveAppBar = () => {
  const [userState] = useContext(UserContext);
  if (!userState.authenticated && !pages.includes("Login")) pages.push("Login");

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const [authenticatedMenuAnchor, setAuthenticatedMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAuthenticatedMenuAnchor(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setMenuAnchor(null);
  };

  const handleCloseUserMenu = () => {
    setAuthenticatedMenuAnchor(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(menuAnchor)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Button}
                  onClick={handleCloseNavMenu}
                  href={page !== "Home" ? `/${page.toLowerCase()}` : "/"}
                >
                  <Typography textAlign="center" color="grey.700">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ display: { xs: "none", sm: "flex" } }}
            flexGrow={1}
            gap={4}
            justifyContent="flex-end"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                href={page !== "Home" ? `/${page.toLowerCase()}` : "/"}
                sx={{
                  my: 2,
                  color: "grey.700",
                  fontWeight: "600",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!userState.authenticated ? (
            <Button variant="outlined" sx={{ ml: 4 }} href="/login">
              Sign me up!
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={authenticatedMenuAnchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(authenticatedMenuAnchor)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    component={Button}
                    {...(setting.toLowerCase() === "logout"
                      ? {
                          onClick: () => {
                            fetch("/api/user/logout");
                            handleCloseUserMenu();
                          },
                          href: "/",
                        }
                      : {
                          href: `/${setting.toLowerCase()}`,
                          onClick: handleCloseUserMenu,
                        })}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
