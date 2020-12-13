import React, { useContext, useState } from 'react';
import { ViewContext } from '../../context/ViewContext';
import { UserContext } from '../../context/UserContext';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css';

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
    <a href="/profile" id="profile-icon">
      <AccountCircleIcon
        className="profile-icon"
        htmlColor="white"
        fontSize="large"
      />
    </a>
  ) : null;

  const navbarItems = (
    <div className="navbarItems large-p">
      <a className={page === '/' ? 'active' : null} href="/">Home</a>
      <a className={page === '/search' ? 'active' : null} href="/search">Search</a>
      {/* Only display register/login link if the user is not authenticated */}
      {!userState.authenticated ? <a className={page === '/login' ? 'active' : null} href="/login">Register/Login</a> : null}
    </div>
  );

  return (
    <div className={`navbar navbar-${size.device.toLowerCase()}`}>
      {/* If the user is on a desktop render a standard navbar and profileItem (which may be null if
       authenticated) */}
      {size.device === 'Desktop' ? (
        <div>
          {navbarItems}
          {profileItem}
        </div>
      ) : 
      (
        <div className="burger-nav">
        {/* If the user is not on a desktop then they will see a burger menu */}
          <MenuIcon
            onClick={handleBurgerClick}
            htmlColor="white"
            fontSize="large"
          />
          {profileItem}
          {burgerItemsVisible ? navbarItems : null}
        </div>
      )}
    </div>
  );
}

export default Navbar;
