import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import RecordClimbModal from '../recordClimbModal';

const SessionRecordClimb = ({
  sessionStarted,
  data,
  setData,
  grades,
  statuses
}) => {
  if (!sessionStarted) return null;

  const onAddClimb = (grade, status) => {
    setData({
      ...data,
      [grade]: {
        ...data[grade],
        [status]: data[grade][status] ? data[grade][status] + 1 : 1
      }
    });
  };

  const onRemoveClimb = (grade, status) => {
    setData({
      ...data,
      [grade]: {
        ...data[grade],
        [status]: data[grade][status] > 0 ? data[grade][status] - 1 : 0
      }
    });
  };

  return (
    <Grid item xs={12}>
      <RecordClimbModal
        mainText="Add Climb"
        callback={onAddClimb}
        grades={grades}
        statuses={statuses}
      />
      <RecordClimbModal
        mainText="Remove Climb"
        callback={onRemoveClimb}
        grades={grades}
        statuses={statuses}
      />
    </Grid>
  );
};

SessionRecordClimb.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  grades: PropTypes.objectOf(String).isRequired,
  statuses: PropTypes.objectOf(String).isRequired
};

export default SessionRecordClimb;
