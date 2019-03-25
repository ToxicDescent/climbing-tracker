import React, { Fragment, useState } from 'react';

import Timer from '../timer/timer';
import Tracker from '../tracker/tracker';

export default function App() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionLocation, setSessionLocation] = useState('indoor');

  const onStartSession = () => {
    setSessionStarted(true);
  }
  const onEndSession = () => {
    setSessionStarted(false);
  }
  const onSessionLocationChange = event => {
    setSessionLocation(event.target.value);
  }

  return (
    <Fragment>
      <h1>Climbing Tracker</h1>
      {
        !sessionStarted &&
        <Fragment>
          <label>
            Indoor
            <input
              type="radio"
              name="sessionLocation"
              value="indoor"
              checked={sessionLocation === 'indoor'}
              onChange={onSessionLocationChange} />
          </label>
          <label>
            Outdoor
            <input
              type="radio"
              name="sessionLocation"
              value="outdoor"
              checked={sessionLocation === 'outdoor'}
              onChange={onSessionLocationChange} />
          </label>
          <button onClick={onStartSession}>Start Session</button>
        </Fragment>
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
