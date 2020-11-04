import React, { useEffect, useState } from 'react';
import isAuthenticated from '../services/auth';
import Navbar from '../components/common/Navbar';
import Home from '../pages/Home';
import RegisterLogin from '../pages/RegisterLogin';
import Profile from '../pages/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function Routes() {
  // Manage state for two items, firstly checkingAuthentication which is indicative of whether
  // or not LOADING should be displayed, once this is false then whether or not a user is auth'd
  // is known and the user hits the router.
  const [userState, setUserState] = useState({ checkingAuthentication: true, authenticated: false });

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await isAuthenticated();
      setUserState({ checkingAuthentication: false, authenticated: isAuth });
   }
    checkAuth();
  }, []);
  if(userState.checkingAuthentication) {
     return <div>LOADING...</div>
  }
  return (
    
    <Router>
    <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={RegisterLogin} />

        {/* The profile page is only available for authenticated user's, redirect unauth'd
        to the login page */}
        {userState.authenticated ? 
        <Route exact path="/profile" component={Profile} /> : 
        <Route exact path="/profile"><Redirect to='/'/></Route>}

        {/* For any other unknown routes re-direct to home page*/}
        <Route path="*"><Redirect to='/'/></Route>
      </Switch>
    </Router>
  );
}

export default Routes;