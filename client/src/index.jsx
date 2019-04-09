import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import App from './components/app';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('material-ui-jss-insertion-point')
});

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <App />
  </JssProvider>,
  document.getElementById('app')
);

module.hot.accept();
