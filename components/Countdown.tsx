import React, { FC, useEffect } from "react";
import { Progress, ProgressProps } from "@mantine/core";

export interface CountdownProps {
  isRunning: boolean;
  timeLeft: number;
  totalTime: number;
  onChange: (timeLeft: number) => void;
  color?: ProgressProps["color"];
  animate?: boolean;
  reverse?: boolean;
}

const CountdownV2: FC<CountdownProps> = ({
  isRunning,
  timeLeft,
  totalTime,
  onChange,
  color,
  animate,
  reverse,
}) => {
  useEffect(() => {
    if (timeLeft === 0 || !isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      onChange(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, onChange]);

  const curValue = reverse
    ? Number(((timeLeft) / totalTime).toFixed(2)) * 100
    : Number(((totalTime - timeLeft) / totalTime).toFixed(2)) * 100;

  const curValueLabel = reverse
    ? timeLeft
    : totalTime - timeLeft;

  return (
    <Progress
      animate={animate}
      color={color}
      size="xl"
      value={curValue}
      label={`${curValueLabel}s / ${totalTime}s`}
      sx={{
        height: "2rem",
      }}
    />
  );
};

export default CountdownV2;
