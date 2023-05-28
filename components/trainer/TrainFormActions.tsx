import { FC } from "react";
import Button from "@mui/material/Button";
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
  const isRunning = trainingStatus === TrainingStatus.TRAINING || trainingStatus === TrainingStatus.RESTING;
  const isStopped = trainingStatus === TrainingStatus.STOPPED;
  const isPaused = trainingStatus === TrainingStatus.REST_PAUSED || trainingStatus === TrainingStatus.TRAINING_PAUSED;

  return (
    <>
      {isStopped && (
        <Button disabled={!canStart} variant="contained" onClick={onClickStart}>
          Start
        </Button>
      )}
      {isPaused && (
        <Button variant="contained" onClick={onClickResume}>
          Resume
        </Button>
      )}
      {isRunning && <Button variant="outlined" color="error" onClick={onClickPause}>
        Pause
      </Button>}
      {(isRunning || isPaused) && <Button variant="contained" color="error" onClick={onClickStop}>
        Stop
      </Button>}
    </>
  );
};
