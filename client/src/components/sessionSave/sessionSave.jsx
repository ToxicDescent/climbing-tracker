import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { saveSession } from '../../api/session';
import sessionToBackend from '../../utility/converters';

const SessionSave = ({
  sessionStarted,
  previousSessionStarted,
  sessionSaved,
  setSessionSaved,
  sessionLocation,
  sessionLength,
  boulderingData,
  climbingData,
  username
}) => {
  const [alertOpen, setAlertOpen] = useState(false);

  const onOpenAlert = () => {
    setAlertOpen(true);
  };
  const onCloseAlert = () => {
    setAlertOpen(false);
  };

  const onSaveSession = () => {
    if (!username) {
      onOpenAlert();
    } else {
      setSessionSaved(true);
      const sessionData = {
        location: sessionLocation,
        length: sessionLength,
        boulders: boulderingData,
        climbs: climbingData
      };
      saveSession(sessionToBackend(sessionData, username));
    }
  };

  if (!sessionStarted && previousSessionStarted && !sessionSaved) {
    return (
      <Fragment>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onSaveSession}>
            Save Session
          </Button>
        </Grid>
        <Dialog open={alertOpen} onClose={onCloseAlert}>
          <DialogTitle>Enter your username in header!</DialogTitle>
        </Dialog>
      </Fragment>
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
  climbingData: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

export default SessionSave;
