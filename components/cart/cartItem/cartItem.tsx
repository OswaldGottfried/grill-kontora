import React, {memo} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import clsx from 'clsx';

import {CartItemType} from 'models/Cart';
import formatPrice from 'lib/formatPrice';

import Price from '@/common/price/price';
import CounterObserver from '@/common/buttons/counterObserver/counterObserver';
import ProductImage from '@/common/image/Image';

import s from './cartItem.module.scss';

type PropsType = {item: CartItemType; isOrder?: boolean; isDisabledForOrder?: boolean};

const CartItem = memo<PropsType>(({item, isOrder = false, isDisabledForOrder = false}) => {
  return (
    <li className={clsx(s.cartItem, {[s.disabled]: isDisabledForOrder})}>
      <Link href={`/product/${item.id}`}>
        <motion.figure className="image cursor-pointer w-36" layoutId={`image_${item.image}`}>
          <ProductImage src={item.image} name={item.name} objectFit="contain" />
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
          {isOrder && item.count > 1 ? (
            <p className="whitespace-nowrap">
              {item.count} x
              <Price price={formatPrice(item.price)} />
            </p>
          ) : (
            <Price price={formatPrice(item.price)} />
          )}
        </div>
        {!isOrder && (
          <div className={s.counter}>
            <CounterObserver
              value={item.id}
              modId={item.modId}
              cartItem={item}
              isDisabled={isDisabledForOrder}
            />
          </div>
        )}
      </div>
    </li>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
