import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext'
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="app">
      <ViewProvider>
        <Navbar />
      </ViewProvider>
    </div>
  );
}

export default App;
