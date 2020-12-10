import Link from 'next/link';
import {observer} from 'mobx-react-lite';
import {useStore} from 'models';

import s from './cartIcon.module.scss';

const MAX_DISPLAYABLE_CART_ITEMS_QUANTITY = 9;

const CartIcon = observer(() => {
  const {totalItems} = useStore('cart');

  return (
    <Link href="/cart">
      <button type="button" className={s.cartButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={s.icon}>
          <path d="M194.6 382.7a64.7 64.7 0 10.1 129.4 64.7 64.7 0 00-.1-129.4zm0 90.5a25.9 25.9 0 110-51.8 25.9 25.9 0 010 51.8zM386 382.7a64.7 64.7 0 100 129.4 64.7 64.7 0 000-129.4zm0 90.5a25.9 25.9 0 110-51.8 25.9 25.9 0 010 51.8zM498 126.3a19.4 19.4 0 00-15-7.3H143.2l-17.6-89.1a19.4 19.4 0 00-15.5-15.4L32.6.3a19.4 19.4 0 10-7 38.2l64.6 11.8 57 287.7c1.7 9 9.7 15.6 19 15.6h271.5c9 0 16.8-6.2 18.9-15l45.2-195.9c1.3-5.8 0-11.8-3.7-16.4zm-75.8 188.5H182.1l-31.1-157h307.5l-36.3 157z" />
        </svg>

        {Boolean(totalItems) && (
          <span className={s.count}>
            {totalItems <= MAX_DISPLAYABLE_CART_ITEMS_QUANTITY
              ? totalItems
              : `${MAX_DISPLAYABLE_CART_ITEMS_QUANTITY}+`}
          </span>
        )}
      </button>
    </Link>
  );
});

export default CartIcon;
