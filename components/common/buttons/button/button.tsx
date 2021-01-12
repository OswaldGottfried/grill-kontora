/* eslint-disable react/button-has-type */
import {FC, MouseEvent, ReactElement} from 'react';
import clsx from 'clsx';

import s from './button.module.scss';

type PropsType = {
  label?: string;
  value?: string | number;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: ReactElement | string;
  color?: 'primary' | 'secondary';
};

const Button: FC<PropsType> = ({
  label,
  value,
  onClick,
  children,
  isLoading,
  color = 'secondary',
  type = 'button',
  className = '',
  isDisabled,
}) => (
  <button
    aria-label={label}
    value={value}
    className={clsx(s.button, className, s[color])}
    type={type}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {children}
  </button>
);

export default Button;
