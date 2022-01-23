import { useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [
    value,
    setValue,
  ] = useState(initialValue);

  const toggle = (nextValue?: boolean) => {
    if (nextValue === undefined) {
      setValue(!value);
    } else {
      setValue(nextValue);
    }
  };

  return [
    value,
    toggle,
  ] as const;
};
