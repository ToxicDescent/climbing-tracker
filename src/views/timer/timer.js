import React, { Fragment, useState, useEffect } from 'react';

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
    }

    return () => clearInterval(timerId);
  }, [timerId, sessionStarted]);

  // Functions
  const onTick = () => {
    setCurrentTime(new Date().getTime());
  }
  const onStartEndSession = () => {
    if (sessionStarted) {
      clearInterval(timerId);
    } else {
      setStartTime(new Date().getTime());
      setCurrentTime(new Date().getTime());
      setTimerId(setInterval(onTick, 1000));
    }
    setSessionStarted(!sessionStarted);
  }

  // Render
  return (
    <Fragment>
      <p>{new Date(currentTime - startTime).toISOString().substr(11, 8)}</p>
    </Fragment>
  )
}
