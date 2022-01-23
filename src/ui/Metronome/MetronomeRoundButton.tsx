import {
  FC,
  MouseEvent,
  useRef,
  useEffect,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/colors';
import { noop, AudioContextManager } from '../../utils';
import {
  useRefOnce,
  useInterval,
  usePrevious,
} from '../../hooks';
import { calDurationByBpm } from './helpers/calDurationByBpm';
import { MetroStatusText } from './MetroStatusText';
import { MetroStatus } from './constants';
import { MetroBpmInput } from './MetroBpmInput';
import { MetroBpmUnit } from './MetroBpmUnit';

import BEAT_SOUND_URL from '../../assets/sound.mp3';

export interface MetronomeRoundButtonProps {
  status: MetroStatus;
  bpm: number;
  max?: number;
  min?: number;
  beatType?: number;
  onBeat?: () => void;
  onClick?: (evt: MouseEvent<HTMLDivElement>) => void;
  onBpmChange?: (bpm: number) => void;
  onDurationIncrease?: (step: number) => void;
  onBarIncrease?: (step: number) => void;
}

const beatAnimation = keyframes`
  from {
    background: ${colors.white};
  }

  to { background: ${colors.grey1};
  }
`;

const Wrapper = styled.div<{ isBeating?: boolean }>`
  position: relative;
  border-radius: 50%;
  border: 3px solid #fafafa;
  background-color: ${colors.white};
  height: 280px;
  width: 280px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 90px;
  animation: ${(props) => (props.isBeating ? beatAnimation : '')} 1s ease-out infinite alternate;

  &:active:not(:focus-within) {
    background-color: ${colors.grey1};
  }

  &:after {
    content: '';
    position: absolute;
    background-color: ${colors.grey2};
    width: 1px;
    height: 280px;
    left: 320px;
  }
`;

export const MetronomeRoundButton: FC<MetronomeRoundButtonProps> = ({
  status,
  bpm,
  max = 300,
  min = 1,
  beatType = 4,
  onBeat = noop,
  onBpmChange = noop,
  onClick = noop,
  onDurationIncrease = noop,
  onBarIncrease = noop,
}) => {
  const beatSinceStarted = useRef(0);
  const prevMetroStatus = usePrevious(status);
  const audioContextManager = useRefOnce(() => new AudioContextManager(BEAT_SOUND_URL));

  const onBpmChangeRef = useRef(onBeat);
  useEffect(() => {
    onBpmChangeRef.current = onBeat;
  }, [onBeat]);

  const onDurationIncreaseRef = useRef(onDurationIncrease);
  useEffect(() => {
    onDurationIncreaseRef.current = onDurationIncrease;
  }, [onDurationIncrease]);

  const onBarIncreaseRef = useRef(onBarIncrease);
  useEffect(() => {
    onBarIncreaseRef.current = onBarIncrease;
  }, [onBarIncrease]);

  useInterval(
    () => {
      if (status === MetroStatus.RUNNING && bpm !== 0) {
        audioContextManager.current.play();
        onBpmChangeRef.current();
      }
    },
    calDurationByBpm(bpm),
    [
      status,
      bpm,
      audioContextManager,
    ],
  );

  // collect beating duration
  useInterval(
    () => {
      if (status === MetroStatus.RUNNING) {
        onDurationIncreaseRef.current(1);
      }
    },
    1000,
    [status],
  );

  // collect bars
  useEffect(() => {
    if (
      status === MetroStatus.RUNNING
        && bpm !== 0
        // only reset beat count from stop/pause to running
        && prevMetroStatus !== MetroStatus.RUNNING
    ) {
      beatSinceStarted.current = 0;
    }
  }, [status, bpm, prevMetroStatus]);

  useInterval(
    () => {
      if (status === MetroStatus.RUNNING && bpm !== 0) {
        beatSinceStarted.current += 1;
        if (beatSinceStarted.current % beatType === 0) {
          onBarIncreaseRef.current(1);
        }
      }
    },
    calDurationByBpm(bpm),
    [status, bpm],
  );

  return (
    <Wrapper
      onClick={onClick}
      isBeating={status === MetroStatus.RUNNING}
    >
      <MetroBpmInput
        value={bpm}
        max={max}
        min={min}
        onChange={(evt) => onBpmChange(Number(evt.target.value))}
        onClick={(evt) => evt.stopPropagation()}
      />
      <MetroBpmUnit>BPM</MetroBpmUnit>
      <MetroStatusText status={status} />
    </Wrapper>
  );
};
