import React, { useContext, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Home from '../pages/Home';
import RegisterLogin from '../pages/RegisterLogin';
import Profile from '../pages/Profile';
import { UserContext } from '../context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

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
  }, [userState, setUserState]);
  if (userState.checkingAuthentication) {
    return <div>LOADING...</div>;
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={RegisterLogin} />

        {/* The profile page is only available for authenticated user's, redirect unauth'd
        to the login page */}
        {userState.authenticated ? (
          <Route exact path="/profile" component={Profile} />
        ) : (
          <Route exact path="/profile">
            <Redirect to="/" />
          </Route>
        )}

        {/* For any other unknown routes re-direct to home page*/}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
