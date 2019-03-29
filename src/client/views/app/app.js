import React, { Fragment, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import SessionTimer from '../sessionTimer/sessionTimer';
import Tracker from '../tracker/tracker';
import { SESSION_LOCATIONS } from '../../utility/constants';

export default function App() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionLocation, setSessionLocation] = useState('indoor');

  const onStartSession = () => {
    setSessionStarted(true);
  };
  const onEndSession = () => {
    setSessionStarted(false);
  };
  const onSessionLocationChange = event => {
    setSessionLocation(event.target.value);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Typography variant="h1">Climbing Tracker</Typography>
      {!sessionStarted && (
        <Fragment>
          <RadioGroup
            aria-label="Session location"
            name="sessionLocation"
            row
            value={sessionLocation}
            onChange={onSessionLocationChange}
          >
            {Object.keys(SESSION_LOCATIONS).map(location => (
              <FormControlLabel
                key={location}
                value={location}
                control={<Radio color="primary" />}
                label={SESSION_LOCATIONS[location]}
              />
            ))}
          </RadioGroup>
          <Button variant="contained" color="primary" onClick={onStartSession}>
            Start Session
          </Button>
        </Fragment>
      )}
      {sessionStarted && (
        <Button variant="contained" color="secondary" onClick={onEndSession}>
          End Session
        </Button>
      )}
      <SessionTimer sessionStarted={sessionStarted} />
      <Tracker sessionStarted={sessionStarted} />
    </Fragment>
  );
}
