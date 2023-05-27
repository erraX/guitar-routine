import type { NextPage } from "next";

import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Countdown, { CountdownRef } from "../components/Countdown";
import { useConfirmExit } from "@/hooks/useConfirmExit";
import Container from "@mui/material/Container";
import { TrainerForm, TrainerValues } from "@/components/trainer/TrainerForm";
import { TrainFormActions } from "@/components/trainer/TrainFormActions";
import { TrainingStatus, TraineringRecord } from "@types";
import { addTraining } from '@/service/training';

interface ActiveTrainingData {
  bpm: number;
  timeRemaining: number;
  groupsRemaining: number;
  breakRemaining: number;
}

const Trainer: NextPage = () => {
  const countdownRef = useRef<CountdownRef>(null);
  const restCountdownRef = useRef<CountdownRef>(null);

  const [alertSaveModalVisible, setAlertSaveModalVisible] = useState(false);

  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus>(
    TrainingStatus.STOPPED
  );

  const [formValues, setFormValues] = useState<TrainerValues>({
    exercise: null,
    duration: 120,
    bpm: 80,
    groups: 5,
    restDuration: 60,
  });

  const [remainingGroups, setRemainingGroups] = useState<number>(0);

  const trainnedGroups = formValues.groups - remainingGroups;

  const isFormValid =
    formValues.exercise !== null &&
    formValues.duration > 0 &&
    formValues.groups > 0;

  const isStopped = trainingStatus === TrainingStatus.STOPPED;

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
      groups: trainnedGroups,
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
              trainingStatus={trainingStatus}
              canStart={isFormValid}
              onClickStart={() => {
                setTrainingStatus(TrainingStatus.RUNNING);
                setRemainingGroups(formValues.groups);
                countdownRef.current?.start();
              }}
              onClickResume={() => {
                setTrainingStatus(TrainingStatus.RUNNING);
                countdownRef.current?.resume();
                restCountdownRef.current?.resume();
              }}
              onClickPause={() => {
                setTrainingStatus(TrainingStatus.PAUSED);
                countdownRef.current?.pause();
                restCountdownRef.current?.pause();
              }}
              onClickStop={() => {
                setTrainingStatus(TrainingStatus.STOPPED);
                countdownRef.current?.stop();
                restCountdownRef.current?.stop();

                if (trainnedGroups > 0) {
                  setAlertSaveModalVisible(true);
                }
              }}
            />
          </Stack>
          <Grid container spacing={2} sx={{ display: isStopped ? 'none' : 'flex' }}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Time remaining</Typography>
                    <Countdown
                      ref={countdownRef}
                      seconds={formValues.duration}
                      onEnd={() => {
                        // No groups remain
                        if (remainingGroups === 1) {
                          setTrainingStatus(TrainingStatus.STOPPED);
                          setRemainingGroups(remainingGroups - 1);
                          if (trainnedGroups > 0) {
                            setAlertSaveModalVisible(true);
                          }
                        } else {
                          // Start rest timer
                          restCountdownRef.current?.start();
                        }
                        setRemainingGroups(remainingGroups - 1);
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
                      ref={restCountdownRef}
                      seconds={formValues.restDuration}
                      onEnd={() => {
                        // Start traingin again
                        setTrainingStatus(TrainingStatus.RUNNING);
                        countdownRef.current?.start();
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
                    <Typography variant="h3">{remainingGroups}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h6">Trained groups</Typography>
                    <Typography variant="h3">{trainnedGroups}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Dialog
        open={alertSaveModalVisible}
        onClose={handleCancelSave}
      >
        <DialogTitle id="alert-dialog-title">
          Trainned {trainnedGroups} groups, do you want to this trainning record?
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
