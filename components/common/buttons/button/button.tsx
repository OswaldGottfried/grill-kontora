/* eslint-disable react/button-has-type */
import {FC, MouseEvent, ReactElement} from 'react';
import classNames from 'classnames';

import s from './button.module.scss';

type PropsType = {
  label?: string;
  value?: string | number;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: ReactElement;
  color?: 'primary' | 'secondary';
};

const Button: FC<PropsType> = ({
  label,
  value,
  onClick,
  children,
  color = 'secondary',
  type = 'button',
  className = '',
}) => (
  <button
    aria-label={label}
    value={value}
    className={classNames(s.button, className, s[color])}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
