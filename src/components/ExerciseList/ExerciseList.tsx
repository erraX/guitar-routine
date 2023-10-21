'use client';

import useSWR from 'swr';
import React, { FC } from 'react';
import { Table, Loader } from '@mantine/core';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ExerciseList: FC = () => {
  const { data, isLoading } = useSWR(
    "/api/exercise",
    fetcher
  );

  if (isLoading) {
    return <Loader color="blue" />;
  }

  const rows = data.map((i: any) => (
    <Table.Tr key={i.id}>
      <Table.Td>{i.name}</Table.Td>
      <Table.Td>{i.description}</Table.Td>
      <Table.Td>{i.detail}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Detail</Table.Th>
          </Table.Tr>
        </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
