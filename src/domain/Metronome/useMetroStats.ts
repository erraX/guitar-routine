import { useReducer, useEffect, useRef } from 'react';

interface MetroStatsState {
  duration: number,
  remainBreakTime: number,
  groups: number,
  bars: number,
}

const initialState: MetroStatsState = {
  duration: 0,
  groups: 0,
  bars: 0,
  remainBreakTime: 0,
};

type MetroStatsAction =
  | { type: 'increaseDuration' }
  | { type: 'resetDuration' }
  | { type: 'increaseGroups' }
  | { type: 'resetGroups' }
  | { type: 'increaseBars' }
  | { type: 'resetBars' }
  | { type: 'setBreakTime', value: number }
  | { type: 'decreaseRemainBreakTime' }
  | { type: 'resetRemainBreakTime' }
  | { type: 'reset' };

const reducer = (state: MetroStatsState, action: MetroStatsAction): MetroStatsState => {
  switch (action.type) {
    case 'increaseDuration':
      return {
        ...state,
        duration: state.duration + 1,
      };
    case 'resetDuration':
      return {
        ...state,
        duration: 0,
      };
    case 'increaseGroups':
      return {
        ...state,
        groups: state.groups + 1,
      };
    case 'resetGroups':
      return {
        ...state,
        groups: 0,
      };
    case 'increaseBars':
      return {
        ...state,
        bars: state.bars + 1,
      };
    case 'resetBars':
      return {
        ...state,
        bars: 0,
      };
    case 'decreaseRemainBreakTime':
      return {
        ...state,
        remainBreakTime: Math.max(state.remainBreakTime - 1, 0),
      };
    case 'setBreakTime':
      return {
        ...state,
        remainBreakTime: action.value,
      };
    case 'resetRemainBreakTime':
      return {
        ...state,
        remainBreakTime: 0,
      };
    case 'reset':
      return { ...initialState };
    default:
      return state;
  }
};

export const useMetroStats = () => {
  const breakTimer = useRef<number | null>(null);
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const isBreaking = state.remainBreakTime > 0;

  const pauseBreak = () => {
    if (breakTimer.current !== null) {
      clearInterval(breakTimer.current);
      breakTimer.current = null;
    }
  };

  const stopBreak = () => {
    pauseBreak();
    dispatch({ type: 'resetRemainBreakTime' });
  };

  const startBreak = (targetBreakTime: number) => {
    if (breakTimer.current !== null) {
      console.warn('Should puase/stop before restart break');
      return;
    }

    // brand new break
    if (!isBreaking) {
      dispatch({ type: 'setBreakTime', value: targetBreakTime });
    }
    breakTimer.current = setInterval(() => {
      dispatch({ type: 'decreaseRemainBreakTime' });
    }, 1000);
  };

  useEffect(() => {
    if (state.remainBreakTime === 0) {
      stopBreak();
    }
  }, [state.remainBreakTime]);

  return {
    isBreaking,
    startBreak,
    pauseBreak,
    stopBreak,
    dispatch,
    ...state,
  };
};
