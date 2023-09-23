'use client';

import React, { FC } from 'react';
import { Table } from '@mantine/core';
import { exercises } from '../../../mockup/exercises';

export const ExerciseList: FC = () => {
  const rows = exercises.map((i) => (
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
