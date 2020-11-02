import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
  isLoggedIn: undefined,
});

export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    isLoggedIn: undefined,
  });

  async function checkLoggedIn() {
    const res = await fetch(
      '/api/user/isloggedin',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          frontend: 'react-frontend',
          credentials: 'include'
        },
      }
    );

    setUserData({ isLoggedIn: await res.json() });
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return <UserContext.Provider value={ userData }>{props.children}</UserContext.Provider>;
};


