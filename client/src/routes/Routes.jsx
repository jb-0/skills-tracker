import React, { useContext, useEffect } from "react";
import AppBar from "../components/AppBar";
import Landing from "../pages/Landing";
import RegisterLogin from "../pages/RegisterLogin";
import Profile from "../pages/Profile";
import { UserContext } from "../context/UserContext";
import { Routes as RouterRoutes, Route, Navigate } from "react-router";
import Loader from "../components/Loader";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userState.checkingAuthentication) {
    return <Loader />;
  }
  return (
    <>
      <AppBar />
      <RouterRoutes>
        {/* if a user is not authenticated then they should be able to access the landing and login pages */}
        {!userState.authenticated ? (
          <>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<RegisterLogin />} />
          </>
        ) : null}

        {/* The profile page is only available for authenticated users, redirect unauth'd to the login page */}
        {userState.authenticated ? (
          <Route exact path="/dashboard" element={<Profile />} />
        ) : (
          <Route exact path="/dashboard" element={<Navigate to="/" />} />
        )}

        {/* For any other unknown routes re-direct to the landing or dashboard depending on whether or not the user 
            is logged in */}
        {userState.authenticated ? (
          <Route path="*" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </RouterRoutes>
    </>
  );
}

export default Routes;
