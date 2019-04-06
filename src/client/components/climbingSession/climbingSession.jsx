import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SessionTable from '../sessionTable';
import SessionRecordClimb from '../sessionRecordClimb';

const ClimbingSession = ({ sessionStarted, climbingData, setClimbingData }) => {
  return (
    <Fragment>
      <SessionTable sessionClimbs={climbingData} />
      <SessionRecordClimb
        sessionStarted={sessionStarted}
        sessionClimbs={climbingData}
        setSessionClimbs={setClimbingData}
      />
    </Fragment>
  );
};

ClimbingSession.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  climbingData: PropTypes.object.isRequired,
  setClimbingData: PropTypes.func.isRequired
};

export default ClimbingSession;
