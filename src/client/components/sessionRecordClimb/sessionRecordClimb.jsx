import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import RecordClimbModal from '../recordClimbModal';

const SessionRecordClimb = ({
  sessionStarted,
  sessionClimbs,
  setSessionClimbs
}) => {
  if (!sessionStarted) return null;

  const onAddClimb = (grade, status) => {
    setSessionClimbs({
      ...sessionClimbs,
      [grade]: {
        ...sessionClimbs[grade],
        [status]: sessionClimbs[grade][status]
          ? sessionClimbs[grade][status] + 1
          : 1
      }
    });
  };

  const onRemoveClimb = (grade, status) => {
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
  };

  return (
    <Grid item xs={12}>
      <RecordClimbModal mainText="Add Climb" callback={onAddClimb} />
      <RecordClimbModal mainText="Remove Climb" callback={onRemoveClimb} />
    </Grid>
  );
};

SessionRecordClimb.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sessionClimbs: PropTypes.object.isRequired,
  setSessionClimbs: PropTypes.func.isRequired
};

export default SessionRecordClimb;
