import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../header';
import Session from '../session';

export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Session />
    </Fragment>
  );
}
