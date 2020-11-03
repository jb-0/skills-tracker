import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import Navbar from './components/common/Navbar';
import Routes from './routes/Routes'

function App() {
  return (
    <div className="app">
        <ViewProvider>
          <Navbar />
          <Routes />
        </ViewProvider>
    </div>
  );
}

export default App;
