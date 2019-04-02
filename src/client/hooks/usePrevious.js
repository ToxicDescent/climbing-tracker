import { useRef, useEffect } from 'react';

export default function usePrevious(value) {
  const savedValue = useRef();
  useEffect(() => {
    savedValue.current = value;
  });
  return savedValue.current;
}
