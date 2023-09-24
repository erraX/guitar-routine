import { atom, useAtom } from 'jotai'

export type ExerciseRunningState = 
  | 'STOP'
  | 'RUNNING'

const exerciseRunningState = atom<ExerciseRunningState>('STOP');

export const useExerciseRunningState = () => {
  const [state, setState] = useAtom(exerciseRunningState);

  const start = () => setState('RUNNING');
  const stop = () => setState('STOP');

  return {
    state,
    start,
    stop,
  };
};

