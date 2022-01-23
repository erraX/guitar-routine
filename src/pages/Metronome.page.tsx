import {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';
import {
  Button,
  OverlayTrigger,
  Popover,
  Form,
} from 'react-bootstrap';
import { useRefOnce } from '../hooks/useRefOnce';
import { formatTime } from '../utils/formatTime';
import { Block } from '../ui/Block';
import { AudioContextManager } from '../utils/AudioContextManager';
import { StatisticCard } from '../ui/StatisticCard';
import { MetronomeRoundButton, MeterStatusEnum } from '../ui/Metronome';
import { colors } from '../styles/colors';

import BEAT_SOUND_URL from '../assets/sound.mp3';

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
export const Metronome = () => {
  const beatCount = useRef(0);
  const [bars, setBars] = useState(0);
  const [groups, setGroups] = useState(0);
  const [duration, setDuration] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [meterStatus, setMeterStatus] = useState(MeterStatusEnum.STOPPED);
  const [bpm, setBpm] = useState(120);

  const toggleBeating = () => {
    if (meterStatus === MeterStatusEnum.RUNNING) {
      setMeterStatus(MeterStatusEnum.PAUSED);
    } else {
      setMeterStatus(MeterStatusEnum.RUNNING);
    }
  };

  const audioContextManager = useRefOnce(() => new AudioContextManager(BEAT_SOUND_URL));
  const playBeatSound = useCallback(() => {
    audioContextManager.current.play();
  }, [audioContextManager]);

  useEffect(() => {
    let timer: any;
    if (meterStatus === MeterStatusEnum.RUNNING && bpm !== 0) {
      playBeatSound();
      timer = setInterval(() => {
        playBeatSound();
      }, Math.floor((60 * 1000) / bpm));
    } else {
      clearInterval(timer);
      timer = null;
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [meterStatus, bpm, playBeatSound]);

  useEffect(() => {
    let timer: any = null;
    if (meterStatus === MeterStatusEnum.RUNNING) {
      timer = setInterval(() => {
        setDuration((value) => value + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      timer = null;
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [meterStatus]);

  useEffect(() => {
    let timer: any;
    if (meterStatus === MeterStatusEnum.RUNNING && bpm !== 0) {
      beatCount.current = 1;
      timer = setInterval(() => {
        beatCount.current += 1;
        if (beatCount.current % 4 === 0) {
          setBars((value) => value + 1);
        }
      }, Math.floor((60 * 1000) / bpm));
    } else {
      clearInterval(timer);
      timer = null;
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [meterStatus, bpm, playBeatSound]);

  const handleClickReset = () => {
    setBreakTime(0);
    setDuration(0);
    setGroups(0);
    setBars(0);
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
    }
  };

  return (
    <PageContent>
      <MeterControls>
        <OverlayTrigger
          trigger="click"
          rootClose
          show={showPlanPopup}
          placement="bottom"
          onToggle={(show) => !show && setShowPlanPopup(false)}
          overlay={(
            <Popover>
              <Popover.Body>
                <Form
                  onSubmit={(values) => {
                    console.log('submit values', values);
                    setIsPlanning(true);
                    setShowPlanPopup(false);
                  }}
                >
                  <Form.Group>
                    <Form.Label>Groups to practice</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Duration of each group:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Break time between each groups:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Form>
                <ButtonControl type="submit">
                  Submit
                </ButtonControl>
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
              onClick={handleClickReset}
            >
              Reset
            </ButtonControl>
          )
        }
      </MeterControls>
      <MeterContent>
        <MetronomeRoundButton
          meterStatus={meterStatus}
          bpm={bpm}
          onClick={toggleBeating}
          onBpmChange={setBpm}
        />
        <MeterStatisticContainer>
          <StatisticCard title="Beating" color="blue">
            {formatTime(duration)}
          </StatisticCard>
          <StatisticCard title="Break" color="blue">
            {formatTime(breakTime)}
          </StatisticCard>
          <StatisticCard title="Bars (4/4)" color="green">
            {bars}
          </StatisticCard>
          <StatisticCard title="Groups" color="green">
            {groups}
          </StatisticCard>
        </MeterStatisticContainer>
      </MeterContent>
    </PageContent>
  );
};
