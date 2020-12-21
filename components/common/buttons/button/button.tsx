import classNames from 'classnames';

import {FC, MouseEvent, ReactElement} from 'react';

import s from './button.module.scss';

type PropsType = {
  label?: string;
  value?: string | number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: ReactElement;
};

const Button: FC<PropsType> = ({label, value, onClick, children, className = ''}) => (
  <button
    aria-label={label}
    value={value}
    className={classNames(s.button, className)}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
