import {FC} from 'react';
import s from './price.module.css';

type PropsType = {
  price: number;
  isExact?: boolean;
};
const Price: FC<PropsType> = ({price, isExact}) => (
  <span className={s.price}>
    {isExact && 'от '}
    {price} {String.fromCharCode(0x20bd)}
  </span>
);

export default Price;
