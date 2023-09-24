'use client'

import { useRef } from 'react';
import { flushSync } from 'react-dom';
import { Button, Stack } from '@mantine/core';
import { useExerciseRunningState } from '../hooks/useExerciseRunningState';
import { ExerciseTrainForm } from '@/components/ExerciseTrainForm';
import { Countdown, CountdownRef } from '@/components/Countdown';
import { useExerciseTrainingForm } from '@/hooks/useExerciseTrainingForm';
import { useBindShortcuts } from '@/hooks/useBindShortcuts';

export default function Home() {
  const countdownRef = useRef<CountdownRef>(null);
  const exerciseRunningState = useExerciseRunningState();

  const {
    formValues,
    handleFieldChange,
  } = useExerciseTrainingForm({
    groups: 3,
    trainingDuration: 60,
    restDuration: 30,
  });

  const handleStart = () => {
    flushSync(() => {
      exerciseRunningState.start();
    });
    console.log('start', formValues);
    countdownRef.current?.start();
  };

  const handleStop = () => {
    exerciseRunningState.stop();
    countdownRef.current?.stop();
    console.log('stop');
  };

  useBindShortcuts({
    '32'() {
      if (exerciseRunningState.state === 'STOP') {
          handleStart();
      }
      if (exerciseRunningState.state === 'RUNNING') {
          handleStop();
      }
    },
  });


  return (
    <Stack>
      {exerciseRunningState.state === 'STOP' && (
        <ExerciseTrainForm
          values={formValues}
          onChange={handleFieldChange}
        />
      )}
      <Stack>
        {exerciseRunningState.state === 'STOP' && <Button onClick={handleStart}>Start</Button>}
        {exerciseRunningState.state === 'RUNNING' && <Button onClick={handleStop} color="red">Stop</Button>}
      </Stack>
      {exerciseRunningState.state === 'RUNNING' && <Countdown
        ref={countdownRef}
        count={formValues['trainingDuration']}
        onEnd={() => {
          handleStop();
        }}
      />}
    </Stack>
  )
}

