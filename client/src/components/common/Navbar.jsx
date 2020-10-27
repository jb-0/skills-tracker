import React, { useContext, useState } from 'react';
import { ViewContext } from '../../context/ViewContext';
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.css';

function Navbar() {
  const [burgerItemsVisible, setBurgerItemsVisible] = useState(false);
  const size = useContext(ViewContext);

  function handleBurgerClick() {
    setBurgerItemsVisible(!burgerItemsVisible);
  };

  const navbarItems = (
    <div className="navbarItems">
      <a href="/">Home</a>
      <a href="/login">Register/Login</a>
    </div>
  );

  return (
    <div className="navbar">
      {size.device === 'Desktop' ? (
        <div>{navbarItems}</div>
      ) : (
        <div className="burger-nav">
          <MenuIcon onClick={handleBurgerClick} htmlColor="white" fontSize="large" />
          {burgerItemsVisible ? navbarItems : null}
        </div>
      )}
    </div>
  );
}

export default Navbar;