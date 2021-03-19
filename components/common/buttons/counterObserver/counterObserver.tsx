import {useCallback, MouseEvent} from 'react';
import {observer} from 'mobx-react-lite';
import clsx from 'clsx';

import {ProductType} from 'types';

import {useStore} from 'models';

import {CartType} from 'types/cart';

import {CartItemType} from 'models/Cart';
import {motion, useAnimation} from 'framer-motion';
import Plus from 'public/svg/plus.svg';
import Minus from 'public/svg/minus.svg';

import s from './counterObserver.module.scss';

type CartObserverType = {
  cartItem: CartItemType;
  value: string;
  modId?: string;
};
type ProductObserverType = {
  product: ProductType;
  value: string;
  modId?: string;
};
type PropsType = CartObserverType | ProductObserverType;

const formatToCartType = (product: ProductType, id: string): CartType => {
  const activeMod = product.modifications?.find(({modificator_id}) => modificator_id === id);
  return {
    name: product.product_name,
    id: product.product_id,
    modId: activeMod ? activeMod.modificator_id : '',
    count: 1,
    price: activeMod ? Number(activeMod.spots[0].price) : Number(product.price[1]),
    image: product.photo || '',
  };
};

const CounterObserver = observer<PropsType>((props) => {
  const id = 'product' in props ? props.product.product_id : props.cartItem.id;
  const item = useCallback(
    (value: string): CartType =>
      'product' in props ? formatToCartType(props.product, value) : props.cartItem,
    [props],
  );
  const {value, modId = ''} = props;
  const {increase, count, decrease} = useStore('cart');
  const counter = count(id, modId);
  const controls = useAnimation();
  const animate = (from: number) => {
    controls.start({
      translateY: 0,
      transition: {
        type: 'keyframes',
        from,
        to: 0,
      },
    });
  };

  const onIncrease = (event: MouseEvent<HTMLButtonElement>) => {
    increase(item(event.currentTarget.value));
    animate(-30);
  };

  const onDecrease = (event: MouseEvent<HTMLButtonElement>) => {
    decrease(item(event.currentTarget.value));
    animate(30);
  };

  return (
    <div className={s.counter}>
      <button
        className={clsx(s.button, {[s.delete]: counter <= 1})}
        type="button"
        disabled={counter === 0}
        onClick={onDecrease}
        value={value}
        aria-label="убрать из корзины"
      >
        {counter <= 1 ? <Plus /> : <Minus />}
      </button>
      <motion.span animate={controls} className={s.count}>
        {counter}
      </motion.span>
      <button
        className={s.button}
        type="button"
        onClick={onIncrease}
        value={value}
        aria-label="увеличить"
      >
        <Plus />
      </button>
    </div>
  );
});

export default CounterObserver;
