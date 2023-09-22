import type { NextPage } from "next";

import { useState, useReducer } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Countdown from "../components/Countdown";
import { useConfirmExit } from "@/hooks/useConfirmExit";
import Container from "@mui/material/Container";
import { TrainerForm, TrainerValues } from "@/components/trainer/TrainerForm";
import { TrainFormActions } from "@/components/trainer/TrainFormActions";
import { TrainingStatus } from "@types";
import { useTrainingState } from '@/hooks/useTrainingState';
import { addTraining } from "@/service/training";

const Trainer: NextPage = () => {
  const [trainingState, dispatchTrainingAction] = useTrainingState();

  const [alertSaveModalVisible, setAlertSaveModalVisible] = useState(false);

  const [formValues, setFormValues] = useState<TrainerValues>({
    exercise: null,
    duration: 2,
    bpm: 80,
    groups: 2,
    restDuration: 2,
  });

  // const isFormValid =
  //   formValues.exercise !== null &&
  //   formValues.duration > 0 &&
  //   formValues.groups > 0;

  // Only for testing
  const isFormValid =
    formValues.duration > 0 &&
    formValues.groups > 0;

  const isStopped = trainingState.status === TrainingStatus.STOPPED;

  const handleCancelSave = () => {
    setAlertSaveModalVisible(false);
  };

  const handleSave = () => {
    setAlertSaveModalVisible(false);
    if (!formValues.exercise) {
      return;
    }
    addTraining({
      exerciseId: Number(formValues.exercise.value),
      exerciseName: formValues.exercise.label,
      bpm: formValues.bpm,
      duration: formValues.duration,
      groups: trainingState.trainedGroups,
      restDuration: formValues.restDuration,
    });
  };

  useConfirmExit({ shouldConfirm: !isStopped });

  return (
    <Container>
      <h3>Trainer</h3>
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={2} direction="column">
          <TrainerForm
            disabled={!isStopped}
            values={formValues}
            onChange={setFormValues}
          />
          <Stack spacing={2} direction="row">
            <TrainFormActions
              trainingStatus={trainingState.status}
              canStart={isFormValid}
              onClickStart={() => {
                dispatchTrainingAction({
                  type: "START_TRAINING",
                  bpm: formValues.bpm,
                  duration: formValues.duration,
                  totalGroups: formValues.groups,
                  restDuration: formValues.restDuration,
                  totalRestGroups: formValues.groups,
                });
              }}
              onClickResume={() => {
                if (trainingState.status === TrainingStatus.TRAINING_PAUSED) {
                  dispatchTrainingAction({
                    type: "RESUME_TRAINING",
                  });
                } else if (trainingState.status === TrainingStatus.REST_PAUSED) {
                  dispatchTrainingAction({
                    type: "RESUME_REST",
                  });
                }
              }}
              onClickPause={() => {
                if (trainingState.status === TrainingStatus.TRAINING) {
                  dispatchTrainingAction({
                    type: "PAUSE_TRAINING",
                  });
                } else if (trainingState.status === TrainingStatus.RESTING) {
                  dispatchTrainingAction({
                    type: "PAUSE_REST",
                  });
                }
              }}
              onClickStop={() => {
                dispatchTrainingAction({
                  type: "STOP_TRAINING",
                });

                if (trainingState.trainedGroups > 0) {
                  setAlertSaveModalVisible(true);
                }
              }}
            />
          </Stack>
          {/* <div>
            <pre>{JSON.stringify(trainingState, null, 2)}</pre>
          </div> */}
          <Grid
            container
            spacing={2}
            sx={{ display: isStopped ? "none" : "flex" }}
          >
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Time remaining</Typography>
                    <Countdown
                      isRunning={trainingState.trainingCountdownRunning}
                      timeLeft={trainingState.trainingCountdownTimeLeft}
                      onChange={(timeLeft) => {
                        dispatchTrainingAction({ type: 'SET_TRAINING_COUNTDOWN', timeLeft });

                        // Current group complete
                        const isCurrentGroupCompleted = timeLeft === 0;
                        if (isCurrentGroupCompleted) {
                          dispatchTrainingAction({ type: 'COMPLETE_TRAINING' });

                          if (trainingState.trainedGroups + 1 === trainingState.totalGroups) {
                            dispatchTrainingAction({ type: 'STOP_TRAINING' });
                            if (trainingState.trainedGroups > 0) {
                              setAlertSaveModalVisible(true);
                            }
                          } else {
                            dispatchTrainingAction({ type: 'START_REST' });
                          }
                        }
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Rest remaining</Typography>
                    <Countdown
                      isRunning={trainingState.restCountdownRunning}
                      timeLeft={trainingState.restCountdownTimeLeft}
                      onChange={(timeLeft) => {
                        dispatchTrainingAction({ type: 'SET_REST_COUNTDOWN', timeLeft });

                        // Current rest complete
                        const isCurrentRestCompleted = timeLeft === 0;
                        if (isCurrentRestCompleted) {
                          dispatchTrainingAction({ type: 'COMPLETE_REST' });
                          dispatchTrainingAction({ type: 'START_NEW_TRAINING_GROUP' });
                        }
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Metronome</Typography>
                    <Typography variant="h3">{formValues.bpm}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Groups remaining</Typography>
                    <Typography variant="h3">{trainingState.totalGroups - trainingState.trainedGroups}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Trained groups</Typography>
                    <Typography variant="h3">{trainingState.trainedGroups}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Dialog open={alertSaveModalVisible} onClose={handleCancelSave}>
        <DialogTitle id="alert-dialog-title">
          Trainned {trainingState.trainedGroups} groups, do you want to this
          trainning record?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelSave}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Trainer;
