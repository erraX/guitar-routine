import { useState } from 'react';
import { useInterval } from '@common/hooks/useInterval';
import { useToggle } from '@common/hooks/useToggle';

interface UseMetroStateConfigs {
  initialBpm?: number;
}

export const useMetroState = ({
  initialBpm = 60,
}: UseMetroStateConfigs = {}) => {
  const [bpm, setBpm] = useState(initialBpm);
  const [duration, setDuration] = useState(0);
  const [isBeating, toggleIsBeating] = useToggle(false);

  const resetDuration = () => {
    setDuration(0);
  };

  // tick duration
  useInterval(
    () => setDuration((value) => value + 1),
    isBeating ? 1000 : null,
  );

  return {
    bpm,
    setBpm,
    duration,
    resetDuration,
    isBeating,
    toggleIsBeating,
  };
};
