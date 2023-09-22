import type { NextPage } from "next";
import {
  NumberInput,
  Stack,
  Group,
  Paper,
  Badge,
  Title,
  Grid,
  Select,
} from "@mantine/core";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
  IconCheck,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useQuery } from "react-query";
import { TrainingStatus } from "@types";
import { TrainFormActions } from "@/components/trainer/TrainFormActions";
import { useTrainingState } from "@/hooks/useTrainingState";
import Countdown from "@/components/Countdown";
import { addTraining } from "@/service/training";

const Trainer: NextPage = () => {
  const [trainingState, dispatchTrainingAction] = useTrainingState();

  const { isLoading: isFetchingExercise, data: exercises } = useQuery(
    "exercise-data",
    () => fetch("/api/exercise").then((res) => res.json()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const exerciseOptions = (exercises || []).map((exercise: any) => ({
    label: exercise.name,
    value: String(exercise.id),
  }));

  const form = useForm({
    initialValues: {
      exercise: "",
      groups: 5,
      duration: 3,
      bpm: 80,
      restDuration: 3,
    },

    validate: {
      exercise: (value) => (!!value ? null : "Invalid exercise"),
      groups: (value) => (!!value ? null : "Invalid groups"),
      duration: (value) => (!!value ? null : "Invalid duration"),
      bpm: (value) => (!!value ? null : "Invalid bpm"),
      restDuration: (value) => (!!value ? null : "Invalid rest duration"),
    },
  });

  const couldEdit =
    trainingState.status !== TrainingStatus.TRAINING &&
    trainingState.status !== TrainingStatus.RESTING;

  const trainingStatusBadgeColor = (() => {
    switch (trainingState.status) {
      case TrainingStatus.TRAINING:
        return "teal";
      case TrainingStatus.TRAINING_PAUSED:
        return "orange";
      case TrainingStatus.RESTING:
        return "blue";
      case TrainingStatus.REST_PAUSED:
        return "orange";
      case TrainingStatus.STOPPED:
        return "red";
    }
  })();

  return (
    <Stack>
      <Paper p="xl">
        <Stack>
          <Title order={3}>Planning</Title>
          <form
            onSubmit={form.onSubmit((values) => {
              console.log("submit values", values);
              dispatchTrainingAction({
                type: "START_TRAINING",
                bpm: form.values.bpm,
                duration: form.values.duration,
                totalGroups: form.values.groups,
                restDuration: form.values.restDuration,
                totalRestGroups: form.values.groups,
              });
              notifications.show({
                message: "Training started",
                color: "teal",
                icon: <IconPlayerPlay />,
              });
            })}
          >
            <Grid>
              <Grid.Col span={6}>
                <Select
                  withAsterisk
                  clearable
                  searchable
                  label="Exercise"
                  placeholder="Choose exercise"
                  disabled={!couldEdit}
                  nothingFound={
                    isFetchingExercise
                      ? "Fetching exercises..."
                      : "No exercises found"
                  }
                  data={exerciseOptions || []}
                  {...form.getInputProps("exercise")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  withAsterisk
                  label="Groups"
                  disabled={!couldEdit}
                  min={0}
                  placeholder="Groups you want to train"
                  {...form.getInputProps("groups")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  withAsterisk
                  label="Duration"
                  disabled={!couldEdit}
                  placeholder="Duration of each group"
                  min={0}
                  {...form.getInputProps("duration")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  withAsterisk
                  label="Rest duration"
                  disabled={!couldEdit}
                  placeholder="Rest duration between each group"
                  min={0}
                  {...form.getInputProps("restDuration")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  withAsterisk
                  label="BPM"
                  placeholder="Metronome BPM"
                  disabled={!couldEdit}
                  min={0}
                  {...form.getInputProps("bpm")}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Group mt="md" spacing="xs">
                  <TrainFormActions
                    trainingStatus={trainingState.status}
                    canStart={true}
                    onClickResume={() => {
                      notifications.show({
                        message: "Training resumed",
                        color: "teal",
                        icon: <IconPlayerPlay />,
                      });
                      if (
                        trainingState.status === TrainingStatus.TRAINING_PAUSED
                      ) {
                        dispatchTrainingAction({
                          type: "RESUME_TRAINING",
                        });
                      } else if (
                        trainingState.status === TrainingStatus.REST_PAUSED
                      ) {
                        dispatchTrainingAction({
                          type: "RESUME_REST",
                        });
                      }
                    }}
                    onClickPause={() => {
                      notifications.show({
                        message: "Training paused",
                        color: "orange",
                        icon: <IconPlayerPause />,
                      });
                      if (trainingState.status === TrainingStatus.TRAINING) {
                        dispatchTrainingAction({
                          type: "PAUSE_TRAINING",
                        });
                      } else if (
                        trainingState.status === TrainingStatus.RESTING
                      ) {
                        dispatchTrainingAction({
                          type: "PAUSE_REST",
                        });
                      }
                    }}
                    onClickStop={() => {
                      dispatchTrainingAction({
                        type: "STOP_TRAINING",
                      });

                      notifications.show({
                        message: "Training stopped",
                        color: "red",
                        icon: <IconPlayerStop />,
                      });

                      if (trainingState.trainedGroups > 0) {
                        // setAlertSaveModalVisible(true);
                      }
                    }}
                  />
                </Group>
              </Grid.Col>
              {/* <Grid.Col span={6}>
                <pre>{JSON.stringify(form.values, null, 2)}</pre>
              </Grid.Col>
              <Grid.Col span={6}>
                <pre>{JSON.stringify(trainingState, null, 2)}</pre>
              </Grid.Col> */}
            </Grid>
          </form>
        </Stack>
      </Paper>
      <Paper p="xl">
        <Stack>
          <Group>
            <Title order={3}>Training</Title>
            <Badge color={trainingStatusBadgeColor}>
              {trainingState.status}
            </Badge>
          </Group>
          <Countdown
            animate
            totalTime={trainingState.duration}
            isRunning={trainingState.trainingCountdownRunning}
            timeLeft={trainingState.trainingCountdownTimeLeft}
            onChange={(timeLeft) => {
              dispatchTrainingAction({
                type: "SET_TRAINING_COUNTDOWN",
                timeLeft,
              });

              // Current group complete
              const isCurrentGroupCompleted = timeLeft === 0;
              if (isCurrentGroupCompleted) {
                dispatchTrainingAction({ type: "COMPLETE_TRAINING" });
                notifications.show({
                  message: "Group completed",
                  icon: <IconCheck />,
                  color: "teal",
                });

                if (
                  trainingState.trainedGroups + 1 ===
                  trainingState.totalGroups
                ) {
                  dispatchTrainingAction({ type: "STOP_TRAINING" });
                  if (trainingState.trainedGroups > 0) {
                    notifications.show({
                      message: "Finished",
                      icon: <IconCheck />,
                      color: "teal",
                    });
                  }
                } else {
                  dispatchTrainingAction({ type: "START_REST" });
                notifications.show({
                  message: "Rest started",
                  icon: <IconCheck />,
                  color: "teal",
                });
                }
              }
            }}
          />
          <Countdown
            reverse
            color="cyan"
            totalTime={trainingState.restDuration}
            isRunning={trainingState.restCountdownRunning}
            timeLeft={trainingState.restCountdownTimeLeft}
            onChange={(timeLeft) => {
              dispatchTrainingAction({ type: "SET_REST_COUNTDOWN", timeLeft });

              // Current rest complete
              const isCurrentRestCompleted = timeLeft === 0;
              if (isCurrentRestCompleted) {
                dispatchTrainingAction({ type: "COMPLETE_REST" });
                dispatchTrainingAction({ type: "START_NEW_TRAINING_GROUP" });
                notifications.show({
                  message: "Rest Finished",
                  icon: <IconCheck />,
                  color: "teal",
                });
              }
            }}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Trainer;
