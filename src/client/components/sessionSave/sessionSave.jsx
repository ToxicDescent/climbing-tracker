import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import saveSession from '../../api/session';
import sessionToBackend from '../../utility/converters';

export default function SessionSave({
  sessionStarted,
  previousSessionStarted,
  sessionSaved,
  setSessionSaved,
  sessionLocation,
  sessionLength,
  sessionClimbs
}) {
  const onSaveSession = () => {
    setSessionSaved(true);
    const sessionData = {
      location: sessionLocation,
      length: sessionLength,
      climbs: sessionClimbs
    };
    saveSession(sessionToBackend(sessionData));
  };

  if (!sessionStarted && previousSessionStarted && !sessionSaved) {
    return (
      <Button variant="contained" color="primary" onClick={onSaveSession}>
        Save Session
      </Button>
    );
  }

  return null;
}

SessionSave.defaultProps = {
  previousSessionStarted: null,
}

SessionSave.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  previousSessionStarted: PropTypes.bool,
  sessionSaved: PropTypes.bool.isRequired,
  setSessionSaved: PropTypes.func.isRequired,
  sessionLocation: PropTypes.string.isRequired,
  sessionLength: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sessionClimbs: PropTypes.object.isRequired
};
