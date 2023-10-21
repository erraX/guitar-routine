'use client';

import useSWR from 'swr';
import React, { useState } from 'react';
import { Button, Select, TextInput, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { addRecord } from '../../../service/record';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecordCreate() {
  const [formValue, setFormValue] = useState({
    exerciseId: null,
    duration: '0',
    restDuration: '0',
    groups: '0',
    bpm: '0',
  });

  const { data, isLoading } = useSWR(
    "/api/exercise",
    fetcher
  );

  const exerciseMapping = (data || []).reduce(
    (prev: any, cur: any) => ({
      ...prev,
      [cur.id]: cur.name,
    }),
    {},
  );

  const handleSave = async () => {
    try {
      await addRecord({
        ...formValue,
        exerciseName: exerciseMapping[formValue.exerciseId as any] || '',
      });
      notifications.show({
        title: 'Success',
        message: 'Save record successfully!',
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Save record error!',
      });
    }
  };


  if (isLoading) {
    return <Loader color="blue" />;
  }

  return (
    <div>
      <Select
        label="Choose Exercise"
        placeholder="Exercise"
        value={String(formValue.exerciseId)}
        data={data.map((item: any) => ({
          value: String(item.id),
          label: `${item.name}-${item.description}`,
        }))}
        onChange={(value: any) => {
          setFormValue(prev => ({
            ...prev,
            exerciseId: value,
          }))
        }}
      />

      <TextInput
        label="Duration"
        value={formValue.duration}
        onChange={(evt: any) => setFormValue(prev => ({
          ...prev,
          duration: evt.target.value,
        }))}
      />

      <TextInput
        label="Rest Duration"
        value={formValue.restDuration}
        onChange={(evt: any) => setFormValue(prev => ({
          ...prev,
          restDuration: evt.target.value,
        }))}
      />

      <TextInput
        label="Groups"
        value={formValue.groups}
        onChange={(evt: any) => setFormValue(prev => ({
          ...prev,
          groups: evt.target.value,
        }))}
      />

      <TextInput
        label="BPM"
        value={formValue.bpm}
        onChange={(evt: any) => setFormValue(prev => ({
          ...prev,
          bpm: evt.target.value,
        }))}
      />
      <Button fullWidth variant="light" color="teal" onClick={handleSave}>Save</Button>
    </div>
  );
}

