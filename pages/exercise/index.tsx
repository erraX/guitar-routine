import type { NextPage } from "next";
import { useState } from 'react';
import { useQuery } from 'react-query';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

import { ExerciseTable } from '@/components/ExerciseTable';

const Exercise: NextPage = () => {
	const [isVisible, setIsVisible] = useState(false);

  const { isLoading, error, data } = useQuery('exercise-data', () =>
    fetch('/api/exercise').then(res => res.json())
  );

	return (
		<div>
			<h2>Exercise</h2>
      {
        isLoading
          ? <CircularProgress />
          : (
            <>
              <Button onClick={() => setIsVisible(true)}>Add exercise</Button>
              <ExerciseTable data={data || []} />
            </>
          )
      }
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