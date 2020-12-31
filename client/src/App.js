import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import { SearchProvider } from './context/SearchContext';
import { UserProvider } from './context/UserContext';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <UserProvider>
        <ViewProvider>
          <SearchProvider>
            <Router>
              <Routes />
            </Router>
          </SearchProvider>
        </ViewProvider>
      </UserProvider>
    </div>
  );
}

export default App;
