import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext'
import Navbar from './components/common/Navbar';
import Home from './pages/Home'
import RegisterLogin from './pages/RegisterLogin'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <ViewProvider>
        <Navbar />
          <Router>
            <Switch>
              <Route path="/login">
                <RegisterLogin />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
      </ViewProvider>
    </div>
  );
}

export default App;
