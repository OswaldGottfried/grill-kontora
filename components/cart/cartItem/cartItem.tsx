import {FC} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import Image from 'next/image';

import {CartItemType} from 'models/Cart';
import formatPrice from 'lib/formatPrice';
import Price from '@/common/price/price';

import CounterObserver from '@/common/buttons/counterObserver/counterObserver';
import s from './cartItem.module.scss';

type PropsType = {item: CartItemType};

const CartItem: FC<PropsType> = ({item}) => {
  return (
    <li key={`${item.id}_${item.modId}`} className={s.cartItem}>
      <motion.figure className="image cursor-pointer" layoutId={`image_${item.image}`}>
        <Link href={`/product/${item.id}`} as={`/product/${item.id}`}>
          <Image
            src={item.image ? `https://gril-kontora.joinposter.com${item.image}` : '/burger.svg'}
            width={150}
            height={100}
            alt={item.name}
          />
        </Link>
      </motion.figure>
      <div className="inline-flex flex-wrap items-center w-full justify-around">
        <Link href={`/product/${item.id}`} as={`/product/${item.id}`}>
          <a
            className="cursor-pointer ml-16 mr-auto text-3xl md:text-xl sm:ml-4 w-2/6 sm:w-full"
            href={`/product/${item.id}`}
          >
            <motion.h3 layoutId={item.name}>{item.name}</motion.h3>
          </a>
        </Link>
        <div className={s.price}>
          <Price price={formatPrice(item.price)} />
        </div>
        <div className={s.counter}>
          <CounterObserver value={item.id} modId={item.modId} cartItem={item} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
