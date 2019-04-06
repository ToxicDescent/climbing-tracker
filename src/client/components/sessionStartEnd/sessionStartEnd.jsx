import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function SessionStartEnd({
  sessionStarted,
  setSessionStarted,
  setSessionSaved
}) {
  const onStartSession = () => {
    setSessionStarted(true);
    setSessionSaved(false);
  };
  const onEndSession = () => {
    setSessionStarted(false);
  };

  if (sessionStarted) {
    return (
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={onEndSession}>
          End Session
        </Button>
      </Grid>
    );
  }
  return (
    <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={onStartSession}>
        Start Session
      </Button>
    </Grid>
  );
}

SessionStartEnd.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  setSessionStarted: PropTypes.func.isRequired,
  setSessionSaved: PropTypes.func.isRequired
};
