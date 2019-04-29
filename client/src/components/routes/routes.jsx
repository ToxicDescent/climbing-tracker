import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import LoginPage from '../loginPage';
import SignupPage from '../signupPage';
import SessionPage from '../sessionPage';

const Routes = () => {
  return (
    <Fragment>
      <Route path="/" exact component={LoginPage} />
      <Route path="/login/" exact component={LoginPage} />
      <Route path="/signup/" exact component={SignupPage} />
      <Route path="/session/" exact component={SessionPage} />
    </Fragment>
  );
};

export default Routes;
