import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import saveSession from '../../api/session';
import sessionToBackend from '../../utility/converters';

const SessionSave = ({
  sessionStarted,
  previousSessionStarted,
  sessionSaved,
  setSessionSaved,
  sessionLocation,
  sessionLength,
  boulderingData,
  climbingData
}) => {
  const onSaveSession = () => {
    setSessionSaved(true);
    const sessionData = {
      location: sessionLocation,
      length: sessionLength,
      boulders: boulderingData,
      climbs: climbingData
    };
    saveSession(sessionToBackend(sessionData));
  };

  if (!sessionStarted && previousSessionStarted && !sessionSaved) {
    return (
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={onSaveSession}>
          Save Session
        </Button>
      </Grid>
    );
  }

  return null;
};

SessionSave.defaultProps = {
  previousSessionStarted: null
};

SessionSave.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  previousSessionStarted: PropTypes.bool,
  sessionSaved: PropTypes.bool.isRequired,
  setSessionSaved: PropTypes.func.isRequired,
  sessionLocation: PropTypes.string.isRequired,
  sessionLength: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  boulderingData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  climbingData: PropTypes.object.isRequired
};

export default SessionSave;
