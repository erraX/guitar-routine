import {
  FC,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useTrainingState } from '../hooks/useTrainingState';
import { MetroStatus } from '@/types/Metronome.type';
import { useMetroState } from '@/domain/metronome/hooks/useMetroState';

interface MetronomePageContextProviderProps {
  initialBpm?: number;
}

const PreferenceContext = createContext<any>(null);
const TrainingContext = createContext<any>(null);
const GlobalStateContext = createContext<any>(null);

export const MetronomePageContextProvider: FC<MetronomePageContextProviderProps> = ({
  children,
  initialBpm = 60,
}) => {
  const metroState = useMetroState({ initialBpm });
  const trainingState = useTrainingState();

  const status = useMemo(() => {
    if (trainingState.isTraining) {
      if (trainingState.isBreaking) {
        return MetroStatus.BREAKING;
      }
      if (trainingState.isPaused) {
        return MetroStatus.PAUSED;
      }
      return MetroStatus.RUNNING;
    }

    return metroState.isBeating ? MetroStatus.RUNNING : MetroStatus.STOPPED;
  }, [
    trainingState.isTraining,
    trainingState.isBreaking,
    trainingState.isPaused,
    metroState.isBeating,
  ]);

  const globalState = useMemo(() => ({
    ...metroState,
    status,
  }), [metroState, status]);

  const traininContextValue = useMemo(() => ({
    ...trainingState,
    startTraining(plans: any) {
      trainingState.stop();
      trainingState.start(plans);
      globalState.toggleIsBeating(false);
      globalState.setBpm(plans.targetBpm);
    },
  }), [trainingState, globalState]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      <TrainingContext.Provider value={traininContextValue}>
        {children}
      </TrainingContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('`useGlobalStateContext` must be used within `GlobalStateContext`');
  }
  return context;
};

export const useTrainingContext = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('`useTrainingContext` must be used within `TrainingContext`');
  }
  return context;
};

export const usePreferenceContext = () => {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error('`usePreferenceContext` must be used within `PreferenceContext`');
  }
  return context;
};
