import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SessionTable from '../sessionTable';
import RecordBoulder from '../recordBoulder';
import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';

const BoulderingSession = ({
  sessionStarted,
  boulderingData,
  setBoulderingData
}) => {
  return (
    <Fragment>
      <SessionTable
        data={boulderingData}
        columnKeys={BOULDERING_GRADES}
        rowKeys={BOULDERING_STATUSES}
      />
      <RecordBoulder
        sessionStarted={sessionStarted}
        boulderingData={boulderingData}
        setBoulderingData={setBoulderingData}
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
