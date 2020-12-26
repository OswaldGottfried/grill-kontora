import Link from 'next/link';
import {observer} from 'mobx-react-lite';
import {useStore} from 'models';

import formatPrice from 'lib/formatPrice';
import s from './cartIcon.module.scss';

const MAX_DISPLAYABLE_CART_ITEMS_QUANTITY = 9999;

const CartIcon = observer(() => {
  const {totalPrice} = useStore('cart');

  const price = formatPrice(totalPrice);

  return (
    <Link href="/cart">
      <button type="button" className={s.button} aria-label="ссылка на корзину">
        {price > 0 && (
          <span className={s.count}>
            {price <= MAX_DISPLAYABLE_CART_ITEMS_QUANTITY
              ? price
              : `${MAX_DISPLAYABLE_CART_ITEMS_QUANTITY}+`}
            {String.fromCharCode(0x20bd)}
          </span>
        )}
        <svg
          width="50"
          height="50"
          version="1.1"
          viewBox="-10 0 37.5 37.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m22.845 4.5109c-0.57751-2.0048-2.414-3.4804-4.5949-3.5114v-0.0016252h-21.636c-2.6765 0-4.8541 2.1776-4.8541 4.8541 0 1.7274 0.92966 3.3383 2.426 4.2037 0.18907 0.10944 0.38518 0.20532 0.58645 0.28767-0.3237 1.5006-0.78881 2.9111-1.275 4.3841-0.88821 2.6909-1.8067 5.4733-1.8067 8.8763v8.7376c0 2.2943 1.8663 4.1607 4.1607 4.1607h23.395l5.1025-4.3557c0.92718-0.79173 1.4592-1.9451 1.4592-3.1644v-10.094c0-6.6204-2.3678-12.902-2.9636-14.378zm-9.0492-0.73919c-0.30068 0.63087-0.46943 1.3362-0.46943 2.0803 0 0.72999 0.16605 1.4394 0.47078 2.0803h-4.9782v-2.0803c0-1.1471 0.93316-2.0803 2.0803-2.0803zm-7.2811 0c-0.30067 0.63087-0.46943 1.3362-0.46943 2.0803v7.6276h-2.7737v-7.6276c0-1.1471 0.93316-2.0803 2.0803-2.0803zm-9.9001 0h4.3527c-0.30067 0.63087-0.46943 1.3362-0.46943 2.0803v2.0803h-3.8833c-0.36595 0-0.7254-0.095892-1.0391-0.27765-0.64225-0.37137-1.0412-1.0621-1.0412-1.8027 0-1.1471 0.93316-2.0803 2.0803-2.0803zm-2.1497 28.57v-8.7376c0-2.9574 0.80961-5.4102 1.667-8.0071 0.51277-1.5532 1.0393-3.1495 1.3993-4.891h2.9666v5.5475h8.3216v-5.5475h9.3616v-2.7737c-0.36595 0-0.7254-0.095892-1.0391-0.27765-0.64225-0.37137-1.0412-1.0621-1.0412-1.8027 0-1.1471 0.93316-2.0803 2.0803-2.0803 0.94995 0 1.7528 0.64035 2.0007 1.512l-0.01571 0.0065c0.0021 0.0046 0.01788 0.041985 0.0447 0.10727 0.03277 0.14655 0.05065 0.29851 0.05065 0.45453v1.3869c0 2.1366-0.60405 4.525-1.2438 7.0536-0.75196 2.9739-1.5299 6.0489-1.5299 9.3119v10.124h-21.636c-0.76466 0-1.3869-0.6222-1.3869-1.3869zm28.57-3.3594c0 0.40631-0.17742 0.79093-0.48649 1.0548l-2.2873 1.9527v-8.3858c0-2.9174 0.73488-5.8222 1.4454-8.6318 0.21562-0.85274 0.42744-1.6902 0.61624-2.5153 0.40902 1.9766 0.71213 4.1953 0.71213 6.4314z"
            strokeWidth=".069344"
          />
        </svg>
      </button>
    </Link>
  );
});

export default CartIcon;
