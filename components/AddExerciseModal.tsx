import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { ExerciseTableRow } from '../types';

type FormValue = Omit<ExerciseTableRow, 'id'>;

export interface AddExerciseModalProps {
  open: boolean;
  onCancel(): void;
  onSubmit(values: FormValue): void;
}

const getDefaultValues = () => ({
  name: '',
  description: '',
  link: '',
});

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const [values, setValues] = useState<FormValue>(getDefaultValues());

  return (
    <Dialog onClose={onCancel} open={open}>
    <DialogTitle>Add exercise</DialogTitle>
    <DialogContent>
      <Stack
        noValidate
        component="form"
        autoComplete="off"
        sx={{
          width: '25ch',
        }}
        spacing={2}
      >
        <TextField
          required
          size="small"
          id="name"
          label="Name"
          value={values.name}
          onChange={(evt: any) => {
            setValues(pv => ({
              ...pv,
              name: evt.target.value,
            }));
          }}
        />
        <TextField
          id="description"
          size="small"
          label="Description"
          value={values.description}
          onChange={(evt: any) => {
            setValues(pv => ({
              ...pv,
              description: evt.target.value,
            }));
          }}
        />
        <TextField
          id="link"
          size="small"
          label="Link"
          value={values.link}
          onChange={(evt: any) => {
            setValues(pv => ({
              ...pv,
              link: evt.target.value,
            }));
          }}
        />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button disabled={!values.name} onClick={() => {
        onSubmit(values);
        setValues(getDefaultValues());
      }} autoFocus>
        Submit
      </Button>
    </DialogActions>
  </Dialog>
  );
};