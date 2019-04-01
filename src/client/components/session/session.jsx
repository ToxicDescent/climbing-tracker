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
  const initialSessionDataState = useMemo(() => {
    const state = {};
    Object.keys(BOULDERING_GRADES).forEach(grade => {
      state[grade] = {};
      Object.keys(BOULDERING_STATUSES).forEach(status => {
        state[grade][status] = 0;
      });
    }, []);
    return state;
  });

  const [sessionData, setSessionData] = useState(initialSessionDataState);
  const [sessionLocation, setSessionLocation] = useState('indoor');
  const [sessionStarted, setSessionStarted] = useState(false);
  const previousSessionStarted = usePrevious(sessionStarted);
  useEffect(() => {
    if (sessionStarted && !previousSessionStarted) {
      setSessionData(initialSessionDataState);
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
        setSessionData({
          ...sessionData,
          [grade]: {
            ...sessionData[grade],
            [status]: sessionData[grade][status]
              ? sessionData[grade][status] + 1
              : 1
          }
        });
        break;
      case 'remove':
        setSessionData({
          ...sessionData,
          [grade]: {
            ...sessionData[grade],
            [status]:
              sessionData[grade][status] > 0
                ? sessionData[grade][status] - 1
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
    const climbs = [];
    Object.keys(sessionData).forEach(key => {
      climbs.push({ grade: key, ...sessionData[key] });
    });
    const data = {
      username: 'toxicdescent',
      session: {
        location: sessionLocation,
        length: 1,
        climbs
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
      <SessionTable session={sessionData} />
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
