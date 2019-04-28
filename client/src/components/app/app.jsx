import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from '../routes';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes />
    </Router>
  );
};

export default App;
