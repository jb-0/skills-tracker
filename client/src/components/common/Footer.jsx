import React from 'react';
import './Footer.css';

function Footer() {
  const todaysDate = new Date();
  const yearPart = todaysDate.getFullYear();

  return <p className="footer-text">Copyright © {yearPart} <a href="https://www.jamiebarrett.co.uk">Jamie Barrett</a></p>
};

export default Footer;