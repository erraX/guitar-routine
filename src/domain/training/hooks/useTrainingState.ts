import { useReducer } from 'react';
import { useInterval } from '../../../common/hooks';

interface TrainingState {
  isTraining: boolean;
  isBreaking: boolean;
  isPaused: boolean;

  ranGroup: number;
  ranDuration: number;
  ranBreakTime: number;

  ranGroupBreakTime: number,
  ranGroupDuration: number,

  targetGroup: number;
  targetDuration: number;
  targetBreakTime: number;
}

type Action =
  | { type: 'start', targetGroup: number, targetDuration: number, targetBreakTime: number }
  | { type: 'resume' }
  | { type: 'pause' }
  | { type: 'reset' }
  | { type: 'increaseDuration' }
  | { type: 'increaseBreakTime' }
  | { type: 'stop' };

const initialState: TrainingState = {
  isTraining: false,
  isBreaking: false,
  isPaused: false,
  ranGroup: 0,
  ranDuration: 0,
  ranBreakTime: 0,
  ranGroupBreakTime: 0,
  ranGroupDuration: 0,
  targetGroup: 0,
  targetDuration: 0,
  targetBreakTime: 0,
};

function reducer(state: TrainingState, action: Action): TrainingState {
  switch (action.type) {
    case 'reset':
      return { ...initialState };
    case 'stop':
      return {
        ...state,
        isTraining: false,
        isBreaking: false,
        isPaused: false,
        ranGroup: 0,
        ranBreakTime: 0,
        ranDuration: 0,
        ranGroupBreakTime: 0,
        ranGroupDuration: 0,
      };
    case 'start':
      return {
        ...state,
        isTraining: true,
        isBreaking: false,
        isPaused: false,
        ranGroupBreakTime: 0,
        ranGroupDuration: 0,
        targetGroup: action.targetGroup,
        targetDuration: action.targetDuration,
        targetBreakTime: action.targetBreakTime,
      };
    case 'pause':
      if (!state.isTraining) {
        return state;
      }
      return {
        ...state,
        isPaused: true,
      };
    case 'resume':
      if (!state.isTraining) {
        return state;
      }
      return {
        ...state,
        isPaused: false,
      };
    case 'increaseDuration': {
      const isCurrentGroupFinished = state.ranGroupDuration + 1 === state.targetDuration;
      const isAllGroupsFinished = isCurrentGroupFinished
        && state.ranGroup + 1 === state.targetGroup;
      return {
        ...state,
        isTraining: !isAllGroupsFinished,
        isBreaking: isAllGroupsFinished ? false : isCurrentGroupFinished,
        ranDuration: state.ranDuration + 1,
        ranGroupDuration: isCurrentGroupFinished ? 0 : state.ranGroupDuration + 1,
        ranGroup: isCurrentGroupFinished ? state.ranGroup + 1 : state.ranGroup,
      };
    }
    case 'increaseBreakTime': {
      const isCurrentBreakFinished = state.ranGroupBreakTime + 1 === state.targetBreakTime;
      return {
        ...state,
        isBreaking: !isCurrentBreakFinished,
        ranBreakTime: state.ranBreakTime + 1,
        ranGroupBreakTime: isCurrentBreakFinished ? 0 : state.ranGroupBreakTime + 1,
      };
    }
    default:
      return state;
  }
}

export const useTrainingState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = ({
    targetGroup,
    targetDuration,
    targetBreakTime,
  }: {
    targetGroup: number;
    targetDuration: number;
    targetBreakTime: number;
  }) => {
    dispatch({
      type: 'start',
      targetGroup,
      targetDuration,
      targetBreakTime,
    });
  };

  const stop = () => {
    dispatch({ type: 'stop' });
  };

  const pause = () => {
    dispatch({ type: 'pause' });
  };

  const resume = () => {
    dispatch({ type: 'resume' });
  };

  const reset = () => {
    dispatch({ type: 'reset' });
  };

  // tick duration
  useInterval(
    () => dispatch({ type: 'increaseDuration' }),
    state.isTraining && !state.isBreaking && !state.isPaused ? 1000 : null,
  );

  // tick break time
  useInterval(
    () => dispatch({ type: 'increaseBreakTime' }),
    state.isTraining && state.isBreaking && !state.isPaused ? 1000 : null,
  );

  return {
    ...state,
    start,
    pause,
    resume,
    stop,
    reset,
  };
};
