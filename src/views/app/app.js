import React, { Fragment } from 'react';

import Timer from '../timer/timer';
import Tracker from '../tracker/tracker';

export default function App() {
  return (
    <Fragment>
      <h1>Climbing Tracker</h1>
      <Timer />
      <Tracker />
    </Fragment>
  );
}
