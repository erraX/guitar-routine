'use client';

import useSWR from 'swr';
import React, { FC } from 'react';
import { Button, Table, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { deleteRecord } from '../../../service/record';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecordHistory() {
  const { data, mutate, isLoading } = useSWR(
    "/api/record",
    fetcher
  );

  if (isLoading) {
    return <Loader color="blue" />;
  }

  const rows = data.map((i: any) => (
    <Table.Tr key={i.id}>
      <Table.Td>{i.exerciseName}</Table.Td>
      <Table.Td>{i.bpm}</Table.Td>
      <Table.Td>{i.groups}</Table.Td>
      <Table.Td>{i.duration}</Table.Td>
      <Table.Td>{i.restDuration}</Table.Td>
      <Table.Td>
        <Button variant="subtle" onClick={async () => {
          try {
            await deleteRecord(i.id);
            notifications.show({
              title: 'Success',
              message: 'Delete record successfully!',
            });
            mutate();
          } catch (error) {
            notifications.show({
              title: 'Error',
              message: 'Delete record error!',
            });
          }
        }}>D</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Exercise Name</Table.Th>
          <Table.Th>BPM</Table.Th>
          <Table.Th>Groups</Table.Th>
          <Table.Th>Duration</Table.Th>
          <Table.Th>Rest duration</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

