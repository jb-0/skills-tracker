import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/common/Navbar';
import Routes from './routes/Routes'

function App() {
  return (
    <div className="app">
      <UserProvider>
        <ViewProvider>
          <Navbar />
          <Routes />
        </ViewProvider>
      </UserProvider>
    </div>
  );
}

export default App;
