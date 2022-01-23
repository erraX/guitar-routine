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
import { InputNumber } from '../InputNumber';
import { calDurationByBpm } from './helpers/calDurationByBpm';
import { MeterStatus, MeterStatusEnum } from './MeterStatus';

import BEAT_SOUND_URL from '../../assets/sound.mp3';

export interface MetronomeRoundButtonProps {
  meterStatus: MeterStatusEnum;
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

const MeterButton = styled.div<{ isBeating?: boolean }>`
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

const MeterBpmInput = styled(InputNumber)`
  font-size: 60px;
  font-weight: 900;
  border: none;
  outline: none;
  background-color: transparent;
  -moz-appearance: textfield;
  max-width: 200px;
  text-align: center;
  line-height: 1;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const MeterBpmUnit = styled.div`
  position: absolute;
  bottom: 80px;
`;

const StyledMeterStatus = styled(MeterStatus)`
  position: absolute;
  font-weight: 900;
  font-size: 12px;
  bottom: 10px;
  color: ${colors.black};
`;

export const MetronomeRoundButton: FC<MetronomeRoundButtonProps> = ({
  meterStatus,
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
  const prevMeterStatus = usePrevious(meterStatus);
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
      if (meterStatus === MeterStatusEnum.RUNNING && bpm !== 0) {
        audioContextManager.current.play();
        onBpmChangeRef.current();
      }
    },
    calDurationByBpm(bpm),
    [
      meterStatus,
      bpm,
      audioContextManager,
    ],
  );

  // collect beating duration
  useInterval(
    () => {
      if (meterStatus === MeterStatusEnum.RUNNING) {
        onDurationIncreaseRef.current(1);
      }
    },
    1000,
    [meterStatus],
  );

  // collect bars
  useEffect(() => {
    if (
      meterStatus === MeterStatusEnum.RUNNING
        && bpm !== 0
        // only reset beat count from stop/pause to running
        && prevMeterStatus !== MeterStatusEnum.RUNNING
    ) {
      beatSinceStarted.current = 0;
    }
  }, [meterStatus, bpm, prevMeterStatus]);

  useInterval(
    () => {
      if (meterStatus === MeterStatusEnum.RUNNING && bpm !== 0) {
        beatSinceStarted.current += 1;
        if (beatSinceStarted.current % beatType === 0) {
          onBarIncreaseRef.current(1);
        }
      }
    },
    calDurationByBpm(bpm),
    [meterStatus, bpm],
  );

  return (
    <MeterButton
      onClick={onClick}
      isBeating={meterStatus === MeterStatusEnum.RUNNING}
    >
      <MeterBpmInput
        value={bpm}
        max={max}
        min={min}
        onChange={(evt) => onBpmChange(Number(evt.target.value))}
        onClick={(evt) => evt.stopPropagation()}
      />
      <MeterBpmUnit>BPM</MeterBpmUnit>
      <StyledMeterStatus status={meterStatus} />
    </MeterButton>
  );
};
