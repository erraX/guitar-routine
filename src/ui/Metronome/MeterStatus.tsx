import { FC } from 'react';
import styled from 'styled-components';

export enum MeterStatusEnum {
  PAUSED,
  RUNNING,
  STOPPED,
}

const STATUS_TEXT = {
  [MeterStatusEnum.PAUSED]: 'Paused',
  [MeterStatusEnum.RUNNING]: 'Beating',
  [MeterStatusEnum.STOPPED]: 'Stopped',
};

interface MeterStatusProps {
  className?: string;
  status: MeterStatusEnum;
}

const Root = styled.div<MeterStatusProps>``;

export const MeterStatus: FC<MeterStatusProps> = ({ status, className }) => (
  <Root className={className} status={status}>
    {STATUS_TEXT[status]}
  </Root>
);
