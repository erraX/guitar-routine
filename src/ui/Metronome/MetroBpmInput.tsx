import styled from 'styled-components';
import { InputNumber } from '../InputNumber';

export const MetroBpmInput = styled(InputNumber)`
  font-size: 60px;
  font-weight: 900;
  border: none;
  outline: none;
  background-color: transparent;
  -moz-appearance: textfield;
  max-width: 200px;
  text-align: center;
  line-height: 1;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
