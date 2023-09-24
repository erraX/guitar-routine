'use client'

import { Button, Stack } from '@mantine/core';
import { useExerciseRunningState } from '../hooks/useExerciseRunningState';
import { ExerciseTrainForm } from '@/components/ExerciseTrainForm';
import { useExerciseTrainingForm } from '../hooks/useExerciseTrainingForm';
import { useBindShortcuts } from '../hooks/useBindShortcuts';

export default function Home() {
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
    exerciseRunningState.start();
    console.log('start', formValues);
  };

  const handleStop = () => {
    exerciseRunningState.stop();
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
    </Stack>
  )
}

