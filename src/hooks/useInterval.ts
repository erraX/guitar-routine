import { useRef, useEffect } from 'react';

export const useInterval = (
  callback: (...args: any) => any,
  delay: number,
  deps: any[],
) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
};
