// Boilperplate `TrainForm` react component

import { FC, useReducer } from "react";
import { useQuery } from "react-query";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export interface TrainerValues {
  exercise: null | { value: string; label: string };
  duration: number;
  bpm: number;
  groups: number;
  restDuration: number;
};

export interface TrainerFormProps {
  disabled?: boolean;
  values: TrainerValues;
  onChange(values: TrainerValues): void;
}

export const TrainerForm: FC<TrainerFormProps> = ({ disabled, values, onChange }) => {
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Autocomplete
          fullWidth
          disabled={disabled}
          loading={isLoading}
          options={exerciseOptions}
          value={values.exercise}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, value) => {
            onChange({
              ...values,
              exercise: value,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Exercise you want to practice" />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="number"
          disabled={disabled}
          label="Duration(seconds) for each group"
          value={values.duration}
          onChange={(event) => {
            onChange({
              ...values,
              duration: Number(event.target.value),
            });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="number"
          disabled={disabled}
          label="How many groups you want to practice"
          value={values.groups}
          onChange={(event) => {
            onChange({
              ...values,
              groups: Number(event.target.value),
            });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="number"
          disabled={disabled}
          label="Duration(seconds) for rest between groups"
          value={values.restDuration}
          onChange={(event) => {
            onChange({
              ...values,
              restDuration: Number(event.target.value),
            });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="number"
          disabled={disabled}
          label="BPM"
          value={values.bpm}
          onChange={(event) => {
            onChange({
              ...values,
              bpm: Number(event.target.value),
            });
          }}
        />
      </Grid>
    </Grid>
  );
};
