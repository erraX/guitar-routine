import { TraineringRecord } from '@types';

export const addTraining = async (training: TraineringRecord) => {
  try {
    const response = await fetch('/api/training', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(training),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteTraining = async (id: number | string) => {
  try {
    const response = await fetch('/api/training', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};