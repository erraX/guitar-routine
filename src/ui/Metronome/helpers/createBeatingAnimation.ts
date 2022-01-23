import { keyframes, Keyframes } from 'styled-components';

interface CreateBeatingAnimationConfigs {
  durationCoefficient: number;
  blinkColor: string;
  backgroundColor: string;
}

export const createBeatingAnimation = ({
  durationCoefficient,
  blinkColor,
  backgroundColor,
}: CreateBeatingAnimationConfigs): Keyframes => keyframes`
  ${durationCoefficient * 100}% {
    background-color: ${blinkColor};
  }

  from,
  to,
  ${durationCoefficient * 2 * 100}% {
    background-color: ${backgroundColor};
  }
`;
