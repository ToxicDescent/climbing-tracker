import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import useInterval from '../../hooks/useInterval';

export default function SessionTimer({ sessionStarted }) {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (sessionStarted) {
      setStartTime(new Date().getTime());
      setCurrentTime(new Date().getTime());
    }
  }, [sessionStarted]);
  useInterval(
    () => {
      setCurrentTime(new Date().getTime());
    },
    sessionStarted ? 1000 : null
  );

  return (
    <Fragment>
      <Typography variant="h3">
        {new Date(currentTime - startTime).toISOString().substr(11, 8)}
      </Typography>
    </Fragment>
  );
}

SessionTimer.propTypes = {
  sessionStarted: PropTypes.bool.isRequired
};
