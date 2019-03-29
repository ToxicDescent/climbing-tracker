import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function SessionTimer({ sessionStarted }) {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    if (sessionStarted) {
      setStartTime(new Date().getTime());
      setCurrentTime(new Date().getTime());
      timerRef.current = setInterval(() => {
        setCurrentTime(new Date().getTime());
      }, 1000);
    } else if (!sessionStarted) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [sessionStarted]);

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
