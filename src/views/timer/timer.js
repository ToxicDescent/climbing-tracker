import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

export default function Timer({ sessionStarted }) {
  // State
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  
  useEffect(() => {
    if (sessionStarted && !timerId) {
      setStartTime(new Date().getTime());
      setCurrentTime(new Date().getTime());
      setTimerId(setInterval(onTick, 1000));
    } else if (!sessionStarted && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }

    return () => clearInterval(timerId);
  }, [timerId, sessionStarted]);

  // Functions
  const onTick = () => {
    setCurrentTime(new Date().getTime());
  }

  // Render
  return (
    <Fragment>
      <Typography variant="body1">{new Date(currentTime - startTime).toISOString().substr(11, 8)}</Typography>
    </Fragment>
  )
}
