'use client'

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button, Stack } from '@mantine/core';
import { useExerciseRunningState } from '../hooks/useExerciseRunningState';
import { ExerciseTrainForm } from '@/components/ExerciseTrainForm';
import { Countdown, CountdownRef } from '@/components/Countdown';
import { useExerciseTrainingForm } from '@/hooks/useExerciseTrainingForm';
import { useBindShortcuts } from '@/hooks/useBindShortcuts';

const SPACE_KEY_CODE = '32';

export default function Home() {
  const countdownRef = useRef<CountdownRef>(null);
  const restCountdownRef = useRef<CountdownRef>(null);
  const exerciseRunningState = useExerciseRunningState();

  const [trainedGroups, setTrainedGroups] = useState(0);

  const {
    formValues,
    handleFieldChange,
  } = useExerciseTrainingForm({
    groups: 2,
    trainingDuration: 3,
    restDuration: 3,
  });

  const handleStart = () => {
    flushSync(() => {
      exerciseRunningState.start();
      setTrainedGroups(0);
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
    [SPACE_KEY_CODE]() {
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
      {exerciseRunningState.state === 'RUNNING' && <div>
        Trained groups: {trainedGroups} / {formValues['groups']}
      </div>}
      {exerciseRunningState.state === 'RUNNING' && <Countdown
        className="text-9xl"
        ref={countdownRef}
        count={formValues['trainingDuration']}
        onEnd={() => {
          console.log('on countdown end');
          setTrainedGroups(prev => prev + 1);
          if (trainedGroups + 1 < formValues['groups']) {
            restCountdownRef.current?.start();
          }
        }}
      />}
      {exerciseRunningState.state === 'RUNNING' && <Countdown
        className="text-9xl"
        ref={restCountdownRef}
        count={formValues['restDuration']}
        onEnd={() => {
          console.log('on rest end');
          countdownRef.current?.start();
        }}
      />}
    </Stack>
  )
}

