/* eslint-disable react/button-has-type */
import {FC, ButtonHTMLAttributes} from 'react';

import s from './button.module.css';

type PropsType = {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children?: JSX.Element;
};

const Price: FC<PropsType> = ({type = 'button', children}) => (
  <button className={s.button} type={type}>
    {children}
  </button>
);

export default Price;
