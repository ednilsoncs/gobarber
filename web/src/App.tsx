import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <GlobalStyle />
        <AppProvider>
          <Routes />
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
