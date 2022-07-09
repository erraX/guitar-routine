import { useRef, useMemo } from 'react';

export const useRefOnce = <T extends unknown>(getValue: () => T) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  useRef(useMemo(() => getValue(), []));
