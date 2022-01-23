import { useCallback, useEffect, useRef } from 'react';

export const useDelayCallback = (
  callback: (...args: any[]) => any,
  delay: number,
) => {
  const timer = useRef<number | null>(null);

  const cancelDelayCallback = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
  }, []);

  const delayedCallback = useCallback(
    (...args: any[]) => {
      timer.current = setTimeout(() => {
        callback(...args);
        timer.current = null;
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    cancelDelayCallback();
  }, [cancelDelayCallback, callback, delay]);

  useEffect(() => () => cancelDelayCallback(), [cancelDelayCallback]);

  return delayedCallback;
};
