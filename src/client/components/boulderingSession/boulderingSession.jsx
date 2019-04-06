import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SessionTable from '../sessionTable';
import SessionRecordClimb from '../sessionRecordClimb';

const BoulderingSession = ({
  sessionStarted,
  boulderingData,
  setBoulderingData
}) => {
  return (
    <Fragment>
      <SessionTable sessionClimbs={boulderingData} />
      <SessionRecordClimb
        sessionStarted={sessionStarted}
        sessionClimbs={boulderingData}
        setSessionClimbs={setBoulderingData}
      />
    </Fragment>
  );
};

BoulderingSession.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  boulderingData: PropTypes.object.isRequired,
  setBoulderingData: PropTypes.func.isRequired
};

export default BoulderingSession;
