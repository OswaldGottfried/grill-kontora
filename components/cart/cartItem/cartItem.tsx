import {FC} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import Image from 'next/image';

import {CartItemType} from 'models/Cart';
import formatPrice from 'lib/formatPrice';
import Price from '@/common/price/price';

import CounterObserver from '@/common/buttons/counterObserver/counterObserver';
import s from './cartItem.module.scss';

type PropsType = {item: CartItemType; isOrder?: boolean};

const CartItem: FC<PropsType> = ({item, isOrder = false}) => {
  return (
    <li className={s.cartItem}>
      <Link href={`/product/${item.id}`}>
        <motion.figure className="image cursor-pointer" layoutId={`image_${item.image}`}>
          <Image
            src={item.image ? `https://gril-kontora.joinposter.com${item.image}` : '/burger.svg'}
            width={150}
            height={100}
            alt={item.name}
          />
        </motion.figure>
      </Link>
      <div
        className={`inline-flex items-center w-full justify-around ${isOrder ? '' : 'flex-wrap'}`}
      >
        <Link href={`/product/${item.id}`}>
          <a
            className={`cursor-pointer mr-auto text-3xl md:text-xl ${
              isOrder ? 'ml-8 mr-8' : 'ml-16 sm:ml-4 sm:w-full w-2/6'
            }`}
            href={`/product/${item.id}`}
          >
            <motion.h3 className={isOrder ? 'text-lg' : 'text-2xl'} layoutId={item.name}>
              {item.name}
            </motion.h3>
          </a>
        </Link>
        <div className={s.price}>
          <Price price={formatPrice(item.price)} />
        </div>
        {!isOrder && (
          <div className={s.counter}>
            <CounterObserver value={item.id} modId={item.modId} cartItem={item} />
          </div>
        )}
      </div>
    </li>
  );
};

export default CartItem;
