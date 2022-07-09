import { useRef, useEffect } from 'react';

export const useInterval = (
  callback: (...args: any) => any,
  delay: number | null,
  deps?: any[],
) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let timer: number | null = null;
    if (delay !== null) {
      timer = setInterval(() => {
        savedCallback.current();
      }, delay);
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...(deps || [])]);
};
