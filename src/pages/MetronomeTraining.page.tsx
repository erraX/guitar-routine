import { FC } from 'react';
import { PageLayout } from '@common/components/PageLayout';
import { TrainingControlBar } from '@/domain/training/containers/TrainingControlBar';
import { MetroStatisticContainer } from '@/domain/training/containers/MetroStatisticContainer';
import { Metronome } from '@/domain/training/containers/Metronome';
import { MetroTrainingList } from '@/domain/training/containers/MetroTrainingList';
import { MetronomePageContextProvider } from '@/domain/training/context/MetronomePageContext';

export const MetronomeTraining: FC = () => (
  <>
    <PageLayout>
      <div>
        <TrainingControlBar />
        <div>
          <Metronome />
          <MetroStatisticContainer />
        </div>
      </div>
    </PageLayout>
    <PageLayout>
      <MetroTrainingList />
    </PageLayout>
  </>
);

export const MetronomeTrainingPage: FC = () => (
  <MetronomePageContextProvider>
    <MetronomeTraining />
  </MetronomePageContextProvider>
);
