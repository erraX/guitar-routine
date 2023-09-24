import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';

export interface CountdownProps {
  className?: string;
  count: number;
  onEnd?(): void;
}

export interface CountdownRef {
  start(): void;
  stop(): void;
}

export const Countdown = forwardRef<CountdownRef, CountdownProps>(function Countdown({ className, count, onEnd }, ref) {
  const [curCount, setCurCount] = useState(count);
  const [isRunning, setIsRunning] = useState(false);

  useImperativeHandle(ref, () => ({
    start() {
      setCurCount(count);
      setIsRunning(true);
    },
    stop() {
      setIsRunning(false);
    },
  }));

  useEffect(
    () => {
      if (!isRunning) {
        return;
      }

      if (curCount === 0) {
        onEnd?.();
        return;
      }

      let timer = setInterval(() => {
        setCurCount((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    },
    [
      curCount,
      isRunning,
      onEnd,
    ],
  );

  return <span className={className}>{curCount}</span>
});
