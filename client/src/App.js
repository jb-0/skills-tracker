import React from 'react';
import { ViewProvider } from './context/ViewContext';
import { SearchProvider } from './context/SearchContext';
import { UserProvider } from './context/UserContext';
import { GlobalStyle } from './GlobalStyles'
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <UserProvider>
        <ViewProvider>
          <SearchProvider>
              <Router>
                <GlobalStyle />
                <Routes />
              </Router>
          </SearchProvider>
        </ViewProvider>
      </UserProvider>
    </div>
  );
}

export default App;
