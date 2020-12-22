import {useCallback, MouseEvent} from 'react';
import {observer} from 'mobx-react-lite';
import classNames from 'classnames';

import {ProductType, Maybe} from 'types';

import {useStore} from 'models';

import {CartType} from 'types/cart';

import getPrice from 'lib/getPriceFromProduct';
import {CartItemType} from 'models/Cart';
import Plus from './svg/plus.svg';
import Minus from './svg/minus.svg';

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
    price: activeMod ? Number(activeMod.spots[0].price) : getPrice(product),
    image: `https://gril-kontora.joinposter.com${product.photo}`,
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
  const {addItem, count, decrease} = useStore('cart');
  const counter = count(id, modId);

  const onIncrease = (event: MouseEvent<HTMLButtonElement>) => {
    addItem(item(event.currentTarget.value));
  };

  const onDecrease = (event: MouseEvent<HTMLButtonElement>) => {
    decrease(item(event.currentTarget.value));
  };

  return (
    <div className={s.counter}>
      <button
        className={classNames(s.button, {[s.delete]: counter <= 1})}
        type="button"
        disabled={counter === 0}
        onClick={onDecrease}
        value={value}
        aria-label="убрать из корзины"
      >
        {counter <= 1 ? <Plus /> : <Minus />}
      </button>
      <span className={s.count}>{counter}</span>
      <button
        className={s.button}
        type="button"
        onClick={onIncrease}
        value={value}
        aria-label="добавить в корзину"
      >
        <Plus />
      </button>
    </div>
  );
});

export default CounterObserver;
