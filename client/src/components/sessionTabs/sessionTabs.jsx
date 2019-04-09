import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BoulderingSession from '../boulderingSession';
import ClimbingSession from '../climbingSession';

const SessionTabs = ({
  sessionStarted,
  boulderingData,
  setBoulderingData,
  climbingData,
  setClimbingData
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const onChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Fragment>
      <Tabs value={currentTab} onChange={onChange}>
        <Tab label="Bouldering" />
        <Tab label="Climbing" />
      </Tabs>
      {currentTab === 0 && (
        <BoulderingSession
          sessionStarted={sessionStarted}
          boulderingData={boulderingData}
          setBoulderingData={setBoulderingData}
        />
      )}
      {currentTab === 1 && (
        <ClimbingSession
          sessionStarted={sessionStarted}
          climbingData={climbingData}
          setClimbingData={setClimbingData}
        />
      )}
    </Fragment>
  );
};

SessionTabs.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  boulderingData: PropTypes.object.isRequired,
  setBoulderingData: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  climbingData: PropTypes.object.isRequired,
  setClimbingData: PropTypes.func.isRequired
};

export default SessionTabs;
