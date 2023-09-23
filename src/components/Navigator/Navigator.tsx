import React, { FC } from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';

export const Navigator: FC = () => {
  return (
    <nav>
      <Link href="/">
        <Button variant="white">Home</Button>
      </Link>
      <Link href="/exercise/manage">
        <Button variant="white">Exercises</Button>
      </Link>
    </nav>
  );
};
