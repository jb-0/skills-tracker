/**
 * The user context is used to carry state that determines whether or not a user details such as
 * whether or not a user is currently authenticated
 */
import React, { createContext, useState } from 'react';
import isAuthenticated from '../services/auth';

export const UserContext = createContext();

export const UserProvider = (props) => {
  // Manage state for two items, firstly checkingAuthentication which is indicative of whether
  // or not LOADING should be displayed, once this is false then whether or not a user is auth'd
  // is known and the user hits the router. This also supplies the function that allows state
  // to be re-confirmed
  const [userState, setUserState] = useState({
    checkingAuthentication: true,
    authenticated: false,
    isAuthenticated,
  });

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {props.children}
    </UserContext.Provider>
  );
};
