import s from './price.module.scss';
import Rouble from './rouble/rouble';

type PropsType = {
  price: number;
  isExact?: boolean;
};
const Price: React.FC<PropsType> = ({price, isExact}) => (
  <span className={s.price}>
    {price > 0 ? (
      <>
        {isExact && 'от '}
        {price} <Rouble />
      </>
    ) : (
      'Бесплатно'
    )}
  </span>
);

export default Price;
