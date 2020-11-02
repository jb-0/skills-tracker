import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import RegisterLogin from './pages/RegisterLogin';
import Profile from './pages/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <UserProvider>
      <ViewProvider>
        <Navbar />
          <Router>
            <Switch>
              <Route exact path="/login" component={RegisterLogin} />
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Router>
      </ViewProvider>
      </UserProvider>
    </div>
  );
}

export default App;
