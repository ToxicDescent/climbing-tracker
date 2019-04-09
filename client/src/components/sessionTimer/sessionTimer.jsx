import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import usePrevious from '../../hooks/usePrevious';
import useInterval from '../../hooks/useInterval';

const SessionTimer = ({ sessionStarted, setSessionLength }) => {
  const previousSessionStarted = usePrevious(sessionStarted);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (sessionStarted) {
      if (!previousSessionStarted) {
        setStartTime(new Date().getTime());
        setCurrentTime(new Date().getTime());
      } else {
        setSessionLength(Math.round((currentTime - startTime) / 1000));
      }
    }
  }, [sessionStarted, currentTime]);
  useInterval(
    () => {
      setCurrentTime(new Date().getTime());
    },
    sessionStarted ? 1000 : null
  );

  return (
    <Grid item xs={12}>
      <Typography variant="h3">
        {new Date(currentTime - startTime).toISOString().substr(11, 8)}
      </Typography>
    </Grid>
  );
};

SessionTimer.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  setSessionLength: PropTypes.func.isRequired
};

export default SessionTimer;
