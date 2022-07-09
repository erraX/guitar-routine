import React, { FC, useCallback, useMemo } from 'react';
import styled, { Keyframes } from 'styled-components';

import { colors } from '@/styles/colors';
import { useRefOnce } from '@common/hooks/useRefOnce';
import { useDelayCallback } from '@common/hooks/useDelayCallback';

import { noop } from '@common/utils/noop';

import { AudioContextManager } from '@common/utils/AudioContextManager';
import { calDurationByBpm } from './helpers/calDurationByBpm';
import { createBeatingAnimation } from './helpers/createBeatingAnimation';

import BEAT_SOUND_URL from '@/assets/sound.mp3';

export interface ButtonStyles {
  animationName: Keyframes | null;
  blinkColor: string;
  backgroundColor: string;
  duration: number;
}

const ButtonRoot = styled.button<ButtonStyles>`
  position: relative;
  outline: none;
  background-color: ${(props) => props.backgroundColor};
  animation-name: ${(props) => props.animationName};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: ${(props) => props.duration}ms;
  transform: translate3d(0,0,0);
  
  &:hover {
    cursor: pointer;
  }
`;

export interface MetronomeBlinkButtonProps {
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  blinkColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  className?: string;
  durationCoefficient?: number;
  bpm: number;
  isBeating: boolean;
}

export interface MetronomeBlinkButtonState {
  duration: number;
}

export const MetronomeBlinkButton: FC<MetronomeBlinkButtonProps> = ({
  onClick = noop,
  blinkColor = colors.aquamarine,
  backgroundColor = colors.white,
  durationCoefficient = 0.3,
  isBeating,
  className,
  children,
  bpm,
}) => {
  const audioContextManager = useRefOnce(() => new AudioContextManager(BEAT_SOUND_URL));
  const playBeatSound = useCallback(() => {
    audioContextManager.current.play();
  }, [audioContextManager]);

  const duration = useMemo(() => calDurationByBpm(bpm), [bpm]);

  const handleBeat = useDelayCallback(
    playBeatSound,
    duration * durationCoefficient,
  );

  const animationName = useMemo(() => createBeatingAnimation({
    durationCoefficient,
    backgroundColor,
    blinkColor,
  }), [durationCoefficient, backgroundColor, blinkColor]);

  return (
    <ButtonRoot
      className={className}
      blinkColor={blinkColor}
      backgroundColor={backgroundColor}
      animationName={isBeating ? animationName : null}
      duration={duration}
      onClick={onClick}
      onAnimationStart={handleBeat}
      onAnimationIteration={handleBeat}
    >
      {children}
    </ButtonRoot>
  );
};
