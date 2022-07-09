import styled from 'styled-components';
import { formatTime } from '@common/utils/formatTime';
import { StatisticCard } from '@common/components/StatisticCard';
import { useTrainingContext } from '../context/MetronomePageContext';

const MeterStatisticContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 1;
  max-height: 280px;
`;

export const MetroStatisticContainer = () => {
  const trainingCtx = useTrainingContext();

  const remainDuration = formatTime(
    trainingCtx.isBreaking || !trainingCtx.isTraining
      ? 0
      : trainingCtx.targetDuration - trainingCtx.ranGroupDuration,
  );

  const remainBreak = formatTime(
    trainingCtx.isBreaking
      ? trainingCtx.targetBreakTime - trainingCtx.ranGroupBreakTime
      : 0,
  );

  const beatingDuration = formatTime(trainingCtx.ranDuration);

  return (
    <MeterStatisticContainerWrapper>
      <StatisticCard title="Remain duration" color="blue">
        {remainDuration}
      </StatisticCard>
      <StatisticCard title="Remain break" color="blue">
        {remainBreak}
      </StatisticCard>
      <StatisticCard title="Beating duration" color="green">
        {beatingDuration}
      </StatisticCard>
      <StatisticCard title="Groups" color="green">
        {trainingCtx.ranGroup}
      </StatisticCard>
    </MeterStatisticContainerWrapper>
  );
};
