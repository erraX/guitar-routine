import React, { FC } from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';

export const Navigator: FC = () => {
  return (
    <nav>
      <Link href="/">
        <Button variant="white">Training</Button>
      </Link>
      <Link href="/exercise/manage">
        <Button variant="white">Exercises</Button>
      </Link>
      <Link href="/record/create">
        <Button variant="white">Create Record</Button>
      </Link>
      <Link href="/record/history">
        <Button variant="white">Record History</Button>
      </Link>
    </nav>
  );
};
