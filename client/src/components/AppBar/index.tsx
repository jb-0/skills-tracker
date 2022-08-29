import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
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
  Icon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoImg from '../../images/logo.svg';

const pages = ['Home', 'Search'];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = () => {
  const [userState] = useContext(UserContext);
  if (!userState.authenticated && !pages.includes('Login')) pages.push('Login');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon sx={{ mr: 1 }}>
            <img src={LogoImg} height={25} width={25} alt="" />
          </Icon>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
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
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Button}
                  onClick={handleCloseNavMenu}
                  href={page !== 'Home' ? `/${page.toLowerCase()}` : '/'}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {!userState.authenticated ? (
            <Icon sx={{ mr: 1 }}>
              <img src={LogoImg} height={25} width={25} alt="" />
            </Icon>
          ) : null}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                href={page !== 'Home' ? `/${page.toLowerCase()}` : '/'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {userState.authenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    component={Button}
                    {...(setting.toLowerCase() === 'logout'
                      ? {
                          onClick: () => {
                            fetch('/api/user/logout');
                            handleCloseUserMenu();
                          },
                          href: '/',
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
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
