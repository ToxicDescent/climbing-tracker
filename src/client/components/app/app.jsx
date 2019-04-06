import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../header';
import Session from '../session';

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Session />
    </Fragment>
  );
};

export default App;
