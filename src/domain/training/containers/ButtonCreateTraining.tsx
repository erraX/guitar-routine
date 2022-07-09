import { FC, useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTrainingContext } from '../context/MetronomePageContext';
import { MetroTrainingForm, MetroTrainingFormValues } from './MetroTrainingForm';

export interface ButtonCreateTrainingProps {}

export const ButtonCreateTraining: FC<ButtonCreateTrainingProps> = () => {
  const trainingContext = useTrainingContext();
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleToggleOverlay = (isShow: boolean) => {
    if (!isShow) {
      setIsShowDropdown(false);
    }
  };

  const handleSubmitTraining = (values: MetroTrainingFormValues) => {
    trainingContext.startTraining({
      targetBreakTime: values.breakTime,
      targetDuration: values.duration,
      targetGroup: values.groups,
      targetBpm: values.bpm,
    });
    setIsShowDropdown(false);
  };

  const handleCancelTraining = () => {
    setIsShowDropdown(false);
  };

  const handleClickCreate = () => {
    if (!trainingContext.isTraining) {
      setIsShowDropdown(true);
    } else {
      trainingContext.stop();
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={isShowDropdown}
      onToggle={handleToggleOverlay}
      overlay={(
        <Popover>
          <Popover.Body>
            <MetroTrainingForm
              onSubmit={handleSubmitTraining}
              onCancel={handleCancelTraining}
            />
          </Popover.Body>
        </Popover>
      )}
    >
      <Button
        variant={trainingContext.isTraining ? 'danger' : 'primary'}
        onClick={handleClickCreate}
      >
        {trainingContext.isTraining ? 'Stop' : 'Start an plan'}
      </Button>
    </OverlayTrigger>
  );
};
