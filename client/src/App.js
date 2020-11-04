import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import { SearchProvider } from './context/SearchContext';
import Routes from './routes/Routes'
import Search from './components/search/SearchBox';

function App() {
  return (
    <div className="app">
        <ViewProvider>
        <SearchProvider>
          <Routes />
        </SearchProvider>
        </ViewProvider>
    </div>
  );
}

export default App;
