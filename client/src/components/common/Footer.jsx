import React from 'react';
import './Footer.css';

function Footer() {
  const todaysDate = new Date();
  const yearPart = todaysDate.getFullYear();

  return (
    <div className="footer">
      <p className="footer-text">
        Copyright © {yearPart}{' '}
        <a href="https://www.jamiebarrett.co.uk">Jamie Barrett</a>
      </p>
    </div>
  );
}

export default Footer;
