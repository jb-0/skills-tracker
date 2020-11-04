import React, { useContext, useState } from 'react';
import { ViewContext } from '../../context/ViewContext';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css';

function Navbar(props) {
  const [burgerItemsVisible, setBurgerItemsVisible] = useState(false);
  const size = useContext(ViewContext);

  function handleBurgerClick() {
    setBurgerItemsVisible(!burgerItemsVisible);
  }

  // Only show profile link if user is authenticated
  const profileItem = props.authenticated ? (
    <a href="/profile" id="profile-icon">
      <AccountCircleIcon
        className="profile-icon"
        htmlColor="white"
        fontSize="large"
      />
    </a>
  ) : null;

  const navbarItems = (
    <div className="navbarItems">
      <a href="/">Home</a>
      {/* Only display register/login link if the user is not authenticated */}
      {!props.authenticated ? <a href="/login">Register/Login</a> : null}
    </div>
  );

  return (
    <div className="navbar">
      {/* If the user is on a desktop render a standard navbar and profileItem (which may be null if
       authenticated) */}
      {size.device === 'Desktop' ? (
        <div>
          {navbarItems}
          {profileItem}
        </div>
      ) : 

      {/* If the user is not on a desktop then they will see a burger menu */}
      (
        <div className="burger-nav">
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
