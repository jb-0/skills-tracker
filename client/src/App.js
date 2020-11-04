import React from 'react';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import Routes from './routes/Routes'

function App() {
  return (
    <div className="app">
        <ViewProvider>
          <Routes />
        </ViewProvider>
    </div>
  );
}

export default App;
