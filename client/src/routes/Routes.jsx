import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
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
  const user = useContext(UserContext);
  console.log(user);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={RegisterLogin} />
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default Routes;