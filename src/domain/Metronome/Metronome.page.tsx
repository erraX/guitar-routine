import {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { formatTime } from '../../utils/formatTime';
import { Block } from '../../ui/Block';
import { StatisticCard } from '../../ui/StatisticCard';
import { usePrevious } from '../../hooks';
import { MetronomeRoundButton, MetroStatus } from '../../ui/Metronome';
import { MetroPlanForm, MetroPlanFormValues } from './MetroPlanForm';
import { useMetroStats } from './useMetroStats';
import { colors } from '../../styles/colors';

const PageContent = styled(Block)`
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const MeterStatisticContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 1;
  max-height: 280px;
`;

const MeterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const MeterControls = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.grey2};
`;

const ButtonControl = styled(Button)`
  font-size: 13px;
  margin-right: 20px;
`;

// TODO:
// 2. save last bpm to localStorage
// 3. support keyboard shortcuts
//    - space => toggle start/stop
//    - up => increase one
//    - down => decrease one
//    - shift+up => increase ten
//    - shift+down => decrease ten
// 4. support mouse drag to change bpm
// 5. record total duration
// 6. record total bar
export const MetronomePage = () => {
  const [plan, setPlan] = useState<MetroPlanFormValues | null>(null);
  const metroStats = useMetroStats();
  const prevIsBreaking = usePrevious(metroStats.isBreaking);
  const [metroStatus, setMetroStatus] = useState(MetroStatus.STOPPED);
  const [bpm, setBpm] = useState(120);

  const startBeating = () => {
    setMetroStatus(MetroStatus.RUNNING);
  };

  const stopBeating = () => {
    setMetroStatus(MetroStatus.STOPPED);
  };

  const pauseBeating = () => {
    setMetroStatus(MetroStatus.PAUSED);
  };

  const toggleBeating = () => {
    if (metroStatus === MetroStatus.RUNNING) {
      pauseBeating();
    } else {
      startBeating();
    }
  };

  const startBreak = () => {
    setMetroStatus(MetroStatus.BREAKING);
  };

  const resetStats = () => {
    metroStats.dispatch({ type: 'reset' });
  };

  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const handleClickPlanButton = () => {
    if (!isPlanning) {
      setShowPlanPopup(true);
      return;
    }
    if (isPlanning) {
      setIsPlanning(false);
      stopBeating();
    }
  };

  const handleSubmitPlan = (values: MetroPlanFormValues) => {
    stopBeating();
    resetStats();
    setBpm(values.bpm);
    setPlan(values);
    setIsPlanning(true);
    setShowPlanPopup(false);
    startBeating();
  };

  const handleDurationIncrease = () => {
    metroStats.dispatch({ type: 'increaseDuration' });

    // start break
    if (plan && metroStats.duration + 1 === plan.duration) {
      metroStats.startBreak(plan.breakTime);
      startBreak();
    }
  };

  useEffect(() => {
    if (!metroStats.isBreaking && prevIsBreaking) {
      metroStats.dispatch({ type: 'resetDuration' });
      metroStats.dispatch({ type: 'increaseGroups' });
      if (plan && metroStats.groups + 1 < plan.groups) {
        startBeating();
      } else {
        stopBeating();
        setIsPlanning(false);
        setPlan(null);
      }
    }
  }, [metroStats.isBreaking, prevIsBreaking]);

  return (
    <PageContent>
      <MeterControls>
        <OverlayTrigger
          trigger="click"
          show={showPlanPopup}
          placement="bottom"
          onToggle={(show) => !show && setShowPlanPopup(false)}
          overlay={(
            <Popover>
              <Popover.Body>
                <MetroPlanForm
                  onSubmit={handleSubmitPlan}
                  onCancel={() => setShowPlanPopup(false)}
                />
              </Popover.Body>
            </Popover>
          )}
        >
          <ButtonControl
            variant={isPlanning ? 'danger' : 'primary'}
            onClick={handleClickPlanButton}
          >
            {isPlanning ? 'Stop' : 'Start an plan'}
          </ButtonControl>
        </OverlayTrigger>
        {
          !isPlanning && (
            <ButtonControl
              variant="secondary"
              onClick={resetStats}
            >
              Reset
            </ButtonControl>
          )
        }
      </MeterControls>
      <MeterContent>
        <MetronomeRoundButton
          status={metroStatus}
          bpm={bpm}
          onClick={toggleBeating}
          onBpmChange={setBpm}
          onDurationIncrease={handleDurationIncrease}
          onBarIncrease={() => metroStats.dispatch({ type: 'increaseBars' })}
        />
        <MeterStatisticContainer>
          <StatisticCard title="Beating duration" color="blue">
            {formatTime(metroStats.duration)}
          </StatisticCard>
          <StatisticCard title="Remain break" color="blue">
            {formatTime(metroStats.remainBreakTime)}
          </StatisticCard>
          <StatisticCard title="Bars (4/4)" color="green">
            {metroStats.bars}
          </StatisticCard>
          <StatisticCard title="Groups" color="green">
            {metroStats.groups}
          </StatisticCard>
        </MeterStatisticContainer>
      </MeterContent>
    </PageContent>
  );
};
