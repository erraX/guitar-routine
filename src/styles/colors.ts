export const colors = {
  aquamarine: 'aquamarine',
  grey1: '#FBFBFB',
  grey2: '#F1F1F1',
  grey3: '#DEDEDE',
  grey4: '#8b8b8b',
  blue: '#1D70CE',
  black: '#000000',
  red: '#FF0000',
  red2: '#f44336',
  green: '#22938A',
  white: '#FFFFFF',
} as const;

export type ColorKeys = keyof typeof colors;
