import React, { FC } from 'react';
import { NumberInput, Stack } from '@mantine/core';
import { ExerciseTrainFormValues } from '../../hooks/useExerciseTrainingForm';

export interface ExerciseTrainFormProps {
  values: ExerciseTrainFormValues;
  onChange: (
    fieldName: keyof ExerciseTrainFormValues,
    value: unknown
  ) => void;
}

export const ExerciseTrainForm: FC<ExerciseTrainFormProps> = ({ values, onChange }) => {
  return (
    <Stack>
      <NumberInput
        label="Groups"
        description="How many groups you want to train"
        placeholder="Input groups number"
        value={values.groups}
        onChange={(value) => onChange('groups', value)}
      />
      <NumberInput
        label="Training Duration"
        description="How much duration you want to train in each group"
        placeholder="Input training duration seconds"
        value={values.trainingDuration}
        onChange={(value) => onChange('trainingDuration', value)}
      />
      <NumberInput
        label="Rest Duration"
        description="How much duration you want to rest between each group"
        placeholder="Input rest duration seconds"
        value={values.restDuration}
        onChange={(value) => onChange('restDuration', value)}
      />
    </Stack>
  );
}
