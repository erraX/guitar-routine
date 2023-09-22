import { FC } from "react";
import { Button } from "@mantine/core";
import { TrainingStatus } from "@types";

export interface TrainFormActionsProps {
  trainingStatus: TrainingStatus;
  canStart: boolean;
  onClickStart?: () => void;
  onClickPause?: () => void;
  onClickResume?: () => void;
  onClickStop?: () => void;
}

export const TrainFormActions: FC<TrainFormActionsProps> = ({
  trainingStatus,
  canStart,
  onClickStart,
  onClickPause,
  onClickResume,
  onClickStop,
}) => {
  // TODO: using context
  const isRunning =
    trainingStatus === TrainingStatus.TRAINING ||
    trainingStatus === TrainingStatus.RESTING;
  const isStopped = trainingStatus === TrainingStatus.STOPPED;
  const isPaused =
    trainingStatus === TrainingStatus.REST_PAUSED ||
    trainingStatus === TrainingStatus.TRAINING_PAUSED;

  return (
    <>
      {isStopped && (
        <Button
          type="submit"
          disabled={!canStart}
          variant="light"
          onClick={onClickStart}
        >
          Start
        </Button>
      )}
      {isPaused && (
        <Button variant="light" color="teal" onClick={onClickResume}>
          Resume
        </Button>
      )}
      {isRunning && (
        <Button variant="light" color="red" onClick={onClickPause}>
          Pause
        </Button>
      )}
      {(isRunning || isPaused) && (
        <Button color="red" onClick={onClickStop}>
          Stop
        </Button>
      )}
    </>
  );
};
