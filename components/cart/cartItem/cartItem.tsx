import {FC} from 'react';
import Link from 'next/link';

import {CartItemType} from 'models/Cart';
import formatPrice from 'lib/formatPrice';
import Price from '@/components/common/price/price';

import CounterObserver from '@/components/common/buttons/counterObserver/counterObserver';
import s from './cartItem.module.scss';

type PropsType = {item: CartItemType};

const CartItem: FC<PropsType> = ({item}) => (
  <li key={`${item.id}_${item.modId}`} className={s.cartItem}>
    <Link href={`/product/${item.id}`} as={`/product/${item.id}`}>
      <img src={item.image} className={s.image} alt={item.name} />
    </Link>
    <div className="inline-flex flex-wrap items-center w-full justify-around">
      <Link href={`/product/${item.id}`} as={`/product/${item.id}`}>
        <a className="cursor-pointer ml-auto mr-auto" href={`/product/${item.id}`}>
          {item.name}
        </a>
      </Link>
      <img src={`https://gril-kontora.joinposter.com${item.image}`} alt="" />
      <div className={s.counter}>
        <CounterObserver value={item.id} modId={item.modId} cartItem={item} />
      </div>
      <Price price={formatPrice(item.price)} />
    </div>
  </li>
);

export default CartItem;
