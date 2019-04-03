import React, { Fragment, useState, useMemo, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import SessionLocation from '../sessionLocation';
import SessionStartEnd from '../sessionStartEnd';
import SessionTimer from '../sessionTimer';
import SessionTable from '../sessionTable';
import SessionRecordClimb from '../sessionRecordClimb';
import SessionSave from '../sessionSave';
import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';
import usePrevious from '../../hooks/usePrevious';

export default function Session() {
  const initialSessionClimbsState = useMemo(() => {
    const initialState = {};
    Object.keys(BOULDERING_GRADES).forEach(grade => {
      initialState[grade] = {};
      Object.keys(BOULDERING_STATUSES).forEach(status => {
        initialState[grade][status] = 0;
      });
    }, []);
    return initialState;
  });

  const [sessionClimbs, setSessionClimbs] = useState(initialSessionClimbsState);
  const [sessionLocation, setSessionLocation] = useState('indoor');
  const [sessionLength, setSessionLength] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const previousSessionStarted = usePrevious(sessionStarted);
  useEffect(() => {
    if (sessionStarted && !previousSessionStarted) {
      setSessionClimbs(initialSessionClimbsState);
    }
  }, [sessionStarted]);
  const [sessionSaved, setSessionSaved] = useState(false);

  return (
    <Fragment>
      <Typography variant="h1">Climbing Tracker</Typography>
      <SessionLocation
        sessionStarted={sessionStarted}
        sessionLocation={sessionLocation}
        setSessionLocation={setSessionLocation}
      />
      <SessionStartEnd
        sessionStarted={sessionStarted}
        setSessionStarted={setSessionStarted}
        setSessionSaved={setSessionSaved}
      />
      <SessionTimer
        sessionStarted={sessionStarted}
        setSessionLength={setSessionLength}
      />
      <SessionTable sessionClimbs={sessionClimbs} />
      <SessionRecordClimb
        sessionStarted={sessionStarted}
        sessionClimbs={sessionClimbs}
        setSessionClimbs={setSessionClimbs}
      />
      <SessionSave
        sessionStarted={sessionStarted}
        previousSessionStarted={previousSessionStarted}
        sessionSaved={sessionSaved}
        setSessionSaved={setSessionSaved}
        sessionLocation={sessionLocation}
        sessionLength={sessionLength}
        sessionClimbs={sessionClimbs}
      />
    </Fragment>
  );
}
