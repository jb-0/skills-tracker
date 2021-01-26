import React from 'react';
import { FooterStyled } from './Footer.styles'

function Footer() {
  const todaysDate = new Date();
  const yearPart = todaysDate.getFullYear();

  return (
    <FooterStyled>
      <p className="footer-text">
        Copyright © {yearPart}{' '}
        <a href="https://www.jamiebarrett.co.uk">Jamie Barrett</a>
      </p>
    </FooterStyled>
  );
}

export default Footer;
