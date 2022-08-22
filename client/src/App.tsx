import React from 'react';
import { ViewProvider } from './context/ViewContext';
import { SearchProvider } from './context/SearchContext';
import { UserProvider } from './context/UserContext';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `html, body, #root, .app {
        min-height: 100%;
        height: 100%;
      }`,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif;",
      textTransform: 'none',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <ViewProvider>
              <SearchProvider>
                <CssBaseline />
                <Router>
                  <Routes />
                </Router>
              </SearchProvider>
            </ViewProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
