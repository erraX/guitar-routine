import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { MetroStatus } from '@/types/Metronome.type';

const STATUS_TEXT = {
  [MetroStatus.PAUSED]: 'Paused',
  [MetroStatus.RUNNING]: 'Beating',
  [MetroStatus.STOPPED]: 'Stopped',
  [MetroStatus.BREAKING]: 'Breaking',
};

interface MetroStatusProps {
  className?: string;
  status: MetroStatus;
}

const Root = styled.div<MetroStatusProps>`
  position: absolute;
  font-weight: 900;
  font-size: 12px;
  bottom: 10px;
  color: ${colors.black};
`;

export const MetroStatusText: FC<MetroStatusProps> = ({ status, className }) => (
  <Root className={className} status={status}>
    {STATUS_TEXT[status]}
  </Root>
);
