import React, { useContext, useState } from 'react';
import { ViewContext } from '../../context/ViewContext';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css';

function Navbar() {
  const [burgerItemsVisible, setBurgerItemsVisible] = useState(false);
  const size = useContext(ViewContext);

  function handleBurgerClick() {
    setBurgerItemsVisible(!burgerItemsVisible);
  }

  const profileItem = (
    <a href="/profile" id="profile-icon">
      <AccountCircleIcon
        className="profile-icon"
        htmlColor="white"
        fontSize="large"
      />
    </a>
  );
  const navbarItems = (
    <div className="navbarItems">
      <a href="/">Home</a>
      <a href="/login">Register/Login</a>
    </div>
  );

  return (
    <div className="navbar">
      {size.device === 'Desktop' ? (
        <div>{navbarItems}{profileItem}</div>
      ) : (
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
