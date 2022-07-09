import { FC } from 'react';
import { StatisticCard } from '@common/components/StatisticCard';
import { formatTime } from '@common/utils/formatTime';
import { PageLayout } from '@common/components/PageLayout';
import { MetronomeRoundButton } from '@common/components/Metronome';
import { MetroStatus } from '@/types/Metronome.type';
import { useMetroState } from '@/domain/metronome/hooks/useMetroState';

export const MetronomePage: FC = () => {
  const metroState = useMetroState();

  const metroStatus = metroState.isBeating
    ? MetroStatus.RUNNING
    : MetroStatus.STOPPED;

  const handleToggleMetro = () => {
    metroState.toggleIsBeating();
  };

  return (
    <PageLayout>
      <MetronomeRoundButton
        bpm={metroState.bpm}
        status={metroStatus}
        onBpmChange={metroState.setBpm}
        onClick={handleToggleMetro}
      />
      <StatisticCard title="Beating duration" color="green">
        {formatTime(metroState.duration)}
      </StatisticCard>
    </PageLayout>
  );
};
