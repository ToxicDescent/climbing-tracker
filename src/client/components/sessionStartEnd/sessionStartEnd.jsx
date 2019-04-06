import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const SessionStartEnd = ({
  sessionStarted,
  setSessionStarted,
  setSessionSaved
}) => {
  const onStartSession = () => {
    setSessionStarted(true);
    setSessionSaved(false);
  };
  const onEndSession = () => {
    setSessionStarted(false);
  };
  const renderButton = (text, onClick, color) => {
    return (
      <Grid item xs={12}>
        <Button variant="contained" color={color} onClick={onClick}>
          {text}
        </Button>
      </Grid>
    );
  };

  if (sessionStarted) {
    return renderButton('End Session', onEndSession, 'secondary');
  }
  return renderButton('Start Session', onStartSession, 'primary');
};

SessionStartEnd.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  setSessionStarted: PropTypes.func.isRequired,
  setSessionSaved: PropTypes.func.isRequired
};

export default SessionStartEnd;
