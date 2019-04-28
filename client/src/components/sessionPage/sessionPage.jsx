import React, { Fragment, useState, useMemo, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Header from '../header';
import SessionLocation from '../sessionLocation';
import SessionStartEnd from '../sessionStartEnd';
import SessionTimer from '../sessionTimer';
import SessionTabs from '../sessionTabs';
import SessionSave from '../sessionSave';
import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES,
  CLIMBING_GRADES,
  CLIMBING_STATUSES
} from '../../utility/constants';
import usePrevious from '../../hooks/usePrevious';

import styles from './sessionPage.css';

const Session = () => {
  const initialBoulderingData = useMemo(() => {
    const data = {};
    Object.keys(BOULDERING_GRADES).forEach(grade => {
      data[grade] = {};
      Object.keys(BOULDERING_STATUSES).forEach(status => {
        data[grade][status] = 0;
      });
    }, []);
    return data;
  });
  const initialClimbingData = useMemo(() => {
    const data = {};
    Object.keys(CLIMBING_GRADES).forEach(grade => {
      data[grade] = {};
      Object.keys(CLIMBING_STATUSES).forEach(status => {
        data[grade][status] = 0;
      });
    }, []);
    return data;
  });

  const [boulderingData, setBoulderingData] = useState(initialBoulderingData);
  const [climbingData, setClimbingData] = useState(initialClimbingData);
  const [sessionLocation, setSessionLocation] = useState('indoor');
  const [sessionLength, setSessionLength] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const previousSessionStarted = usePrevious(sessionStarted);
  useEffect(() => {
    if (sessionStarted && !previousSessionStarted) {
      setBoulderingData(initialBoulderingData);
      setClimbingData(initialClimbingData);
    }
  }, [sessionStarted]);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Fragment>
      <Header username={username} setUsername={setUsername} />
      <Grid
        className={styles.container}
        container
        spacing={16}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className={styles.paper}>
          <Grid
            container
            spacing={16}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h2" color="inherit">
                Climbing Tracker
              </Typography>
            </Grid>
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
            <SessionTabs
              sessionStarted={sessionStarted}
              boulderingData={boulderingData}
              setBoulderingData={setBoulderingData}
              climbingData={climbingData}
              setClimbingData={setClimbingData}
            />
            <SessionSave
              sessionStarted={sessionStarted}
              previousSessionStarted={previousSessionStarted}
              sessionSaved={sessionSaved}
              setSessionSaved={setSessionSaved}
              sessionLocation={sessionLocation}
              sessionLength={sessionLength}
              boulderingData={boulderingData}
              climbingData={climbingData}
              username={username}
            />
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default Session;
