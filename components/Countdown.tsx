import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Typography from "@mui/material/Typography";

export interface CountdownProps {
  seconds: number;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export interface CountdownRef {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

const Countdown = forwardRef<CountdownRef, CountdownProps>(function Countdown(
  { seconds, onStop, onPause, onResume },
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
        onStop?.();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isRunning, onStop]);

  return (
    <Typography variant="h6">
      {timeLeft > 0 ? `倒计时: ${timeLeft}秒` : "时间到!"}
    </Typography>
  );
});

export default Countdown;
