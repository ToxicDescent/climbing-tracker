import React, { Fragment, useState } from 'react';

import Timer from '../timer/timer';
import Tracker from '../tracker/tracker';

export default function App() {
  const [sessionStarted, setSessionStarted] = useState(false);

  const onStartSession = () => {
    setSessionStarted(true);
  }
  const onEndSession = () => {
    setSessionStarted(false);
  }

  return (
    <Fragment>
      <h1>Climbing Tracker</h1>
      {
        !sessionStarted &&
        <button onClick={onStartSession}>Start Session</button>
      }
      {
        sessionStarted &&
        <Fragment>
          <Timer sessionStarted={sessionStarted} />
          <Tracker />
          <button onClick={onEndSession}>End Session</button>
        </Fragment>
      }
    </Fragment>
  );
}
