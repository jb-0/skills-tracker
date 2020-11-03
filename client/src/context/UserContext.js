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
    
    // Fail safe, if for any reason we cannot reach the server or the request is bad and a non 200
    // is returned we switch to false to ensure private routes remain private.
    if (res.status === 200) {
      setUserData({ isLoggedIn: await res.json() });
    } else {
      setUserData({ isLoggedIn: false });
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return <UserContext.Provider value={ userData }>{props.children}</UserContext.Provider>;
};


