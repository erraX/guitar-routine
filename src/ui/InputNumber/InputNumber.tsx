import {
  FC,
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
} from 'react';
import { noop } from '../../utils/noop';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  integer?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

/* eslint-disable */
export const InputNumber: FC<InputNumberProps> = ({
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  className,
  integer = true,
  onChange = noop,
  onKeyPress = noop,
  ...restProps
}) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let value = evt.target.value;

    if (value !== '') {
      let num = Number(value);
      num = Math.min(Number(max), num);
      num = Math.max(Number(min), num);
      if (integer) {
        num = Math.floor(num);
      }

      value = String(num);
    }

    evt.target.value = String(value);
    onChange(evt);
  };

  return <input
    type="number"
    className={className}
    onChange={handleChange}
    {...restProps}
  />;
};
