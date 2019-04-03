import React, { Fragment, useState, useMemo, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import SessionLocation from '../sessionLocation';
import SessionStartEnd from '../sessionStartEnd';
import SessionTimer from '../sessionTimer';
import SessionTable from '../sessionTable';
import ModifyClimbModal from '../modifyClimbModal';
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
      {sessionStarted && (
        <Fragment>
          <ModifyClimbModal type="add" onModifyClimb={onModifyClimb} />
          <ModifyClimbModal type="remove" onModifyClimb={onModifyClimb} />
        </Fragment>
      )}
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
