import React, { useContext, useEffect } from 'react';
import AppBar from '../components/common/AppBar';
import Loader from '../components/common/Loader';
import Landing from '../pages/Landing';
import Search from '../pages/Search';
import RegisterLogin from '../pages/RegisterLogin';
import Profile from '../pages/Profile';
import { UserContext } from '../context/UserContext';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router';

function Routes() {
  const [userState, setUserState] = useContext(UserContext);

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await userState.isAuthenticated();
      setUserState((previousValues) => {
        return {
          ...previousValues,
          checkingAuthentication: false,
          authenticated: isAuth,
        };
      });
    }
    checkAuth();
  }, []);

  if (userState.checkingAuthentication) {
    return <Loader />;
  }
  return (
    <>
      <AppBar />
      <RouterRoutes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<RegisterLogin />} />

        {/* The profile page is only available for authenticated users, redirect unauth'd to the login page */}
        {userState.authenticated ? (
          <Route exact path="/profile" element={<Profile />} />
        ) : (
          <Route exact path="/profile" element={<Navigate to="/" />} />
        )}

        {/* For any other unknown routes re-direct to home page*/}
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </>
  );
}

export default Routes;
