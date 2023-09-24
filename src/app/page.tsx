'use client'

import { Button, Stack } from '@mantine/core';
import { useExerciseRunningState } from '../hooks/useExerciseRunningState';
import { ExerciseTrainForm } from '@/components/ExerciseTrainForm';
import { useExerciseTrainingForm } from '../hooks/useExerciseTrainingForm';

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

  return (
    <Stack>
      {exerciseRunningState.state === 'STOP' && (
        <ExerciseTrainForm
          values={formValues}
          onChange={handleFieldChange}
        />
      )}
      <Stack>
        {exerciseRunningState.state === 'STOP' && <Button onClick={() => {
            exerciseRunningState.start();
            console.log('start', formValues);
        }}>Start</Button>}
        {exerciseRunningState.state === 'RUNNING' && <Button onClick={exerciseRunningState.stop} color="red">Stop</Button>}
      </Stack>
    </Stack>
  )
}

