import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface ButtonProps {
  color: 'black' | 'red';
}

const themes = {
  black: {
    normal: {
      backgroundColor: colors.black,
      borderColor: colors.black,
      color: colors.white,
    },
    hover: {
      backgroundColor: colors.white,
      borderColor: colors.black,
      color: colors.black,
    },
  },
  red: {
    normal: {
      backgroundColor: colors.red,
      borderColor: colors.red,
      color: colors.white,
    },
    hover: {
      backgroundColor: colors.white,
      borderColor: colors.red,
      color: colors.red,
    },
  },
};

export const Button = styled.button<ButtonProps>`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${(props) => themes[props.color].normal.backgroundColor};
  border: 1px solid ${(props) => themes[props.color].normal.borderColor};
  color: ${(props) => themes[props.color].normal.color};
  cursor: pointer;
  outline: none;
  transition: all .15s ease;

  &:hover {
    background-color: ${(props) => themes[props.color].hover.backgroundColor};
    color: ${(props) => themes[props.color].hover.color};
  }
`;
