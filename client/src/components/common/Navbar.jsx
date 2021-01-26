import React, { useContext, useState } from 'react';
import { ViewContext } from '../../context/ViewContext';
import { UserContext } from '../../context/UserContext';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavbarStyled, ProfileIcon, NavItem, BurgerNav } from './Navbar.Styles';

function Navbar() {
  const [burgerItemsVisible, setBurgerItemsVisible] = useState(false);
  const size = useContext(ViewContext);
  const [userState] = useContext(UserContext);
  const page = window.location.pathname;

  function handleBurgerClick() {
    setBurgerItemsVisible(!burgerItemsVisible);
  }

  // Only show profile link if user is authenticated
  const profileItem = userState.authenticated ? (
    <ProfileIcon href="/profile" data-testid="profile-icon">
      <AccountCircleIcon
        className="profile-icon"
        htmlColor="white"
        fontSize="large"
      />
    </ProfileIcon>
  ) : null;

  const navbarItems = (
    <div className="large-p">
      <NavItem active={page === '/'} device={size.device.toLowerCase()} href="/">
        Home
      </NavItem>
      <NavItem active={page === '/search'} device={size.device.toLowerCase()} href="/search">
        Search
      </NavItem>
      {/* Only display register/login link if the user is not authenticated */}
      {!userState.authenticated ? (
        <NavItem active={page === '/login'} device={size.device.toLowerCase()} href="/login">
          Register/Login
        </NavItem>
      ) : null}
    </div>
  );

  return (
    <NavbarStyled>
      {/* If the user is on a desktop render a standard navbar and profileItem (which may be null if
       authenticated) */}
      {size.device === 'Desktop' ? (
        <div>
          {navbarItems}
          {profileItem}
        </div>
      ) : 
      (
        <BurgerNav>
        {/* If the user is not on a desktop then they will see a burger menu */}
          <MenuIcon
            onClick={handleBurgerClick}
            htmlColor="white"
            fontSize="large"
          />
          {profileItem}
          {burgerItemsVisible ? navbarItems : null}
        </BurgerNav>
      )}
    </NavbarStyled>
  );
}

export default Navbar;
