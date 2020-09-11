import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './router';
import GlobalStyles from './styles/globais';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
