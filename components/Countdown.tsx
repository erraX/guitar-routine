import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Typography from "@mui/material/Typography";

export interface CountdownProps {
  seconds: number;
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onEnd?: () => void;
}

export interface CountdownRef {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

const Countdown = forwardRef<CountdownRef, CountdownProps>(function Countdown(
  { seconds, onStart, onStop, onPause, onResume, onEnd },
  ref
) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(seconds);

  useImperativeHandle(ref, () => ({
    stop() {
      setTimeLeft(0);
      setIsRunning(false);
      onStop?.();
    },
    start() {
      setTimeLeft(seconds);
      setIsRunning(true);
      onStart?.();
    },
    resume() {
      setIsRunning(true);
      onResume?.();
    },
    pause() {
      setIsRunning(false);
      onPause?.()
    },
  }));

  useEffect(() => {
    if (!timeLeft || !isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 1) {
        setIsRunning(false);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isRunning, onStop, onEnd]);

  return (
    <Typography variant="h3">
      {timeLeft}S
    </Typography>
  );
});

export default Countdown;
