export const getExercises = async () => {
  try {
    const response = await fetch('/api/exercise', {
      method: 'GET',
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addExercise = async (exercise: any) => {
  try {
    const response = await fetch('/api/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateExercise = async (exercise: any) => {
  try {
    const response = await fetch('/api/exercise', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteExercise = async (id: number | string) => {
  try {
    const response = await fetch('/api/exercise', {
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
