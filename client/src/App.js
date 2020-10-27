import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext'
import Navbar from './components/common/Navbar';
import Home from './pages/Home'

function App() {
  return (
    <div className="app">
      <ViewProvider>
        <Navbar />
        <Home />
      </ViewProvider>
    </div>
  );
}

export default App;
