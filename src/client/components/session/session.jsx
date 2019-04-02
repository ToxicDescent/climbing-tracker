import React, { Fragment, useState, useMemo, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import SessionTimer from '../sessionTimer';
import SessionTable from '../sessionTable';
import ModifyClimbModal from '../modifyClimbModal';
import {
  SESSION_LOCATIONS,
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';
import usePrevious from '../../hooks/usePrevious';
import saveSession from '../../api/session';

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
  const [sessionStarted, setSessionStarted] = useState(false);
  const previousSessionStarted = usePrevious(sessionStarted);
  useEffect(() => {
    if (sessionStarted && !previousSessionStarted) {
      setSessionClimbs(initialSessionClimbsState);
    }
  }, [sessionStarted]);
  const [sessionSaved, setSessionSaved] = useState(false);

  const onStartSession = () => {
    setSessionStarted(true);
    setSessionSaved(false);
  };
  const onEndSession = () => {
    setSessionStarted(false);
  };
  const onSessionLocationChange = event => {
    setSessionLocation(event.target.value);
  };

  const onModifyClimb = (type, grade, status) => {
    switch (type) {
      case 'add':
        setSessionClimbs({
          ...sessionClimbs,
          [grade]: {
            ...sessionClimbs[grade],
            [status]:
              sessionClimbs[grade][status] === 0
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
    const data = {
      username: 'toxicdescent',
      session: {
        location: sessionLocation,
        length: 0,
        climbs: sessionClimbs
      }
    };
    saveSession(data);
  };

  return (
    <Fragment>
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
