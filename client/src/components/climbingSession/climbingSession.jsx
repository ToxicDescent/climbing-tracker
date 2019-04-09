import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SessionTable from '../sessionTable';
import RecordClimb from '../recordClimb';
import { CLIMBING_GRADES, CLIMBING_STATUSES } from '../../utility/constants';

const ClimbingSession = ({ sessionStarted, climbingData, setClimbingData }) => {
  return (
    <Fragment>
      <SessionTable
        data={climbingData}
        columnKeys={CLIMBING_GRADES}
        rowKeys={CLIMBING_STATUSES}
      />
      <RecordClimb
        sessionStarted={sessionStarted}
        climbingData={climbingData}
        setClimbingData={setClimbingData}
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
