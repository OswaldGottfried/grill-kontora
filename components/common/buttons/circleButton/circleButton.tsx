import classNames from 'classnames';

import {FC, MouseEvent} from 'react';

import s from './circleButton.module.scss';

type PropsType = {
  label: string;
  value: string | number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const CircleButton: FC<PropsType> = ({label, value, onClick, className = ''}) => (
  <button
    aria-label={label}
    value={value}
    className={classNames(className, s.button)}
    type="button"
    onClick={onClick}
  >
    <svg width="64" height="64" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 20H29l-1-1V6a4 4 0 00-8 0v13l-1 1H6a4 4 0 000 8h13l1 1v13a4 4 0 008 0V29l1-1h13a4 4 0 000-8z" />
    </svg>
  </button>
);

export default CircleButton;
