import { useState } from 'react';

export interface ExerciseTrainFormValues {
  groups: number;
  trainingDuration: number;
  restDuration: number;
}

export const useExerciseTrainingForm = (initialValues: ExerciseTrainFormValues) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleFieldChange = (
    fieldName: keyof ExerciseTrainFormValues,
    nextValue: any
  ) => {
    setFormValues(state => ({
        ...state,
        [fieldName]: nextValue,
    }))
  };

  return {
    formValues,
    handleFieldChange,
  };
};

