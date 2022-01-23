import { FC, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/colors';
import { noop } from '../../utils/noop';
import { InputNumber } from '../InputNumber';
import { MeterStatus, MeterStatusEnum } from './MeterStatus';

export interface MetronomeRoundButtonProps {
  meterStatus: MeterStatusEnum;
  bpm: number;
  max?: number;
  min?: number;
  onClick?: (evt: MouseEvent<HTMLDivElement>) => void;
  onBpmChange?: (bpm: number) => void;
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
  onBpmChange = noop,
  onClick = noop,
}) => (
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
