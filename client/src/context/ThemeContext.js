/**
 * The theme context provides styling theme attributes as well as defining global styles
 */
import React, { createContext } from 'react';
import { createGlobalStyle } from 'styled-components';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const theme = {
    primaryColor: '#212529',
    secondaryColor: 'white',
    tertiaryColor: '#ffb703',
    primaryPad: '20px',
    mainFont: `Nunito', sans-serif`,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: var(--main-font);
  text-align: center;
  color: var(--primary-color);
  background-color: var(--primary-color);
  margin-bottom: 60px;
  }

  p,
  input,
  select,
  textarea,
  button {
    font-family: var(--main-font);
    color: var(--primary-color);
    font-size: 16px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 900;
  }

  a {
    text-decoration: none;
  }

  .large-p, .large-a {
    font-size: 22px;
  }

  .secondary-font-color {
    color: var(--secondary-color);
  }
`;
