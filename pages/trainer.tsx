import type { NextPage } from "next";

import { useReducer, useState, useRef } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Countdown, { CountdownRef } from "../components/Countdown";

const Trainer: NextPage = () => {
  const countdownRef = useRef<CountdownRef>(null);
  const [trainStatus, setTrainStatus] = useState<
    "STOPPED" | "RUNNING" | "PAUSED"
  >("STOPPED");
  // trainer form value using useReducer
  const [trainerFormValue, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "exercise":
          return { ...state, exercise: action.payload };
        case "duration":
          return { ...state, duration: action.payload };
        case "groups":
          return { ...state, groups: action.payload };
        default:
          return state;
      }
    },
    {
      exercise: null,
      duration: 0,
      groups: 0,
    }
  );

  const { isLoading, data } = useQuery(
    "exercise-data",
    () => fetch("/api/exercise").then((res) => res.json()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // Genreate exercise options
  const exerciseOptions = (data || []).map((exercise: any) => ({
    value: String(exercise.id),
    label: exercise.name,
  }));

  return (
    <div>
      <h3>Trainer</h3>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              disabled={trainStatus === "RUNNING" || trainStatus === "PAUSED"}
              loading={isLoading}
              sx={{ width: "100%" }}
              options={exerciseOptions}
              value={trainerFormValue.exercise}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, value) => {
                dispatch({ type: "exercise", payload: value });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Exercise you want to practice" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              disabled={trainStatus === "RUNNING" || trainStatus === "PAUSED"}
              sx={{ width: "100%" }}
              label="Duration(seconds) for each group"
              value={trainerFormValue.duration}
              onChange={(event) => {
                dispatch({ type: "duration", payload: event.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              disabled={trainStatus === "RUNNING" || trainStatus === "PAUSED"}
              sx={{ width: "100%" }}
              label="How many groups you want to practice"
              value={trainerFormValue.groups}
              onChange={(event) => {
                dispatch({ type: "groups", payload: event.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              {trainStatus !== "RUNNING" && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setTrainStatus("RUNNING");
                    if (trainStatus === "STOPPED") {
                      countdownRef.current?.start();
                    } else if (trainStatus === "PAUSED") {
                      countdownRef.current?.resume();
                    }
                  }}
                  disabled={
                    trainerFormValue.exercise === null ||
                    trainerFormValue.duration === 0 ||
                    trainerFormValue.groups === 0
                  }
                >
                  {trainStatus === "PAUSED" ? "Resume" : "Start"}
                </Button>
              )}
              {trainStatus === "RUNNING" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setTrainStatus("PAUSED");
                    countdownRef.current?.pause();
                  }}
                >
                  Pause
                </Button>
              )}
              {(trainStatus === "RUNNING" || trainStatus === "PAUSED") && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setTrainStatus("STOPPED");
                    countdownRef.current?.stop();
                  }}
                >
                  Stop
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Countdown
          ref={countdownRef}
          seconds={trainerFormValue.duration}
          onStop={() => {
            setTrainStatus("STOPPED");
          }}
        />
      </Box>
    </div>
  );
};

export default Trainer;
