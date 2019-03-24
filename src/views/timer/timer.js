import React, { Fragment, useState, useEffect } from 'react';

export default function Timer() {
  // State
  const [sessionStarted, setSessionStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  
  useEffect(() => {
    return () => clearInterval(timerId);
  }, [timerId]);

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
      <button onClick={onStartEndSession}>{sessionStarted ? 'End Session' : 'Start Session'}</button>
    </Fragment>
  )
}
