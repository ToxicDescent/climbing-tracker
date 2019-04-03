import React from 'react';
import PropTypes from 'prop-types';
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
      <Button variant="contained" color="secondary" onClick={onEndSession}>
        End Session
      </Button>
    );
  }
  return (
    <Button variant="contained" color="primary" onClick={onStartSession}>
      Start Session
    </Button>
  );
}

SessionStartEnd.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  setSessionStarted: PropTypes.func.isRequired,
  setSessionSaved: PropTypes.func.isRequired
};
