import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SessionTable from '../sessionTable';
import SessionRecordClimb from '../sessionRecordClimb';
import { CLIMBING_GRADES, CLIMBING_STATUSES } from '../../utility/constants';

const ClimbingSession = ({ sessionStarted, climbingData, setClimbingData }) => {
  return (
    <Fragment>
      <SessionTable
        data={climbingData}
        columnKeys={CLIMBING_GRADES}
        rowKeys={CLIMBING_STATUSES}
      />
      <SessionRecordClimb
        sessionStarted={sessionStarted}
        data={climbingData}
        setData={setClimbingData}
        grades={CLIMBING_GRADES}
        statuses={CLIMBING_STATUSES}
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
