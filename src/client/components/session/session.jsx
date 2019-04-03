import React, { Fragment, useState, useMemo, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SessionLocation from '../sessionLocation';
import SessionStartEnd from '../sessionStartEnd';
import SessionTimer from '../sessionTimer';
import SessionTable from '../sessionTable';
import ModifyClimbModal from '../modifyClimbModal';
import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';
import usePrevious from '../../hooks/usePrevious';
import saveSession from '../../api/session';
import sessionToBackend from '../../utility/converters';

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

  const onModifyClimb = (type, grade, status) => {
    switch (type) {
      case 'add':
        setSessionClimbs({
          ...sessionClimbs,
          [grade]: {
            ...sessionClimbs[grade],
            [status]: sessionClimbs[grade][status]
              ? sessionClimbs[grade][status] + 1
              : 1
          }
        });
        break;
      case 'remove':
        setSessionClimbs({
          ...sessionClimbs,
          [grade]: {
            ...sessionClimbs[grade],
            [status]:
              sessionClimbs[grade][status] > 0
                ? sessionClimbs[grade][status] - 1
                : 0
          }
        });
        break;
      default:
        break;
    }
  };

  const onSaveSession = () => {
    setSessionSaved(true);
    const sessionData = {
      location: sessionLocation,
      length: sessionLength,
      climbs: sessionClimbs
    };
    saveSession(sessionToBackend(sessionData));
  };

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
      />
      <SessionTimer
        sessionStarted={sessionStarted}
        setSessionLength={setSessionLength}
      />
      <SessionTable sessionClimbs={sessionClimbs} />
      {sessionStarted && (
        <Fragment>
          <ModifyClimbModal type="add" onModifyClimb={onModifyClimb} />
          <ModifyClimbModal type="remove" onModifyClimb={onModifyClimb} />
        </Fragment>
      )}
      {!sessionStarted && previousSessionStarted && !sessionSaved && (
        <Fragment>
          <Button variant="contained" color="primary" onClick={onSaveSession}>
            Save Session
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
}
