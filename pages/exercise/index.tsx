import type { NextPage } from "next";
import { useState } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { ExerciseTableMUI } from '@/components/ExerciseTableMui';

const Exercise: NextPage = () => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div>
			<h2>Exercise</h2>
			<Button onClick={() => setIsVisible(true)}>Add exercise</Button>
			<ExerciseTableMUI />
      <Dialog onClose={() => setIsVisible(false)} open={isVisible}>
        <DialogTitle>Add exercise</DialogTitle>
        <DialogContent>
          <div>Modal content</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsVisible(false)}>Cancel</Button>
          <Button onClick={() => {
            console.log('submit');
            setIsVisible(false);
          }} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
		</div>
	)
};

export default Exercise;