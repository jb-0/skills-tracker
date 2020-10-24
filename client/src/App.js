import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext'
import Navbar from './components/common/Navbar';
import HomePage from './components/home/HomePage'

function App() {
  return (
    <div className="app">
      <ViewProvider>
        <Navbar />
        <HomePage />
      </ViewProvider>
    </div>
  );
}

export default App;
