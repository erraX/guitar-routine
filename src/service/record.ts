export const addRecord = async (record: any) => {
  try {
    const response = await fetch('/api/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecord = async (id: number | string) => {
  try {
    const response = await fetch('/api/record', {
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
