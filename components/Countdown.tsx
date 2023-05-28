import React, { FC, useEffect } from "react";
import Typography from "@mui/material/Typography";

export interface CountdownProps {
  isRunning: boolean;
  timeLeft: number;
  onChange: (timeLeft: number) => void;
}

const CountdownV2: FC<CountdownProps> = ({ isRunning, timeLeft, onChange }) => {
  useEffect(() => {
    if (timeLeft === 0 || !isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      onChange(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, onChange]);

  return <Typography variant="h3">{timeLeft}S</Typography>;
};

export default CountdownV2;
