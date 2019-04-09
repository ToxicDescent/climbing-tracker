import { useRef, useEffect } from 'react';

const usePrevious = value => {
  const savedValue = useRef();
  useEffect(() => {
    savedValue.current = value;
  });
  return savedValue.current;
};

export default usePrevious;
