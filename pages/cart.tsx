import Head from 'next/head';
import {observer} from 'mobx-react-lite';

import {useStore} from 'models';
import CartItem from '@/components/cart/cartItem/cartItem';
import Price from '@/components/common/price/price';
import formatPrice from 'lib/formatPrice';

const Cart = observer(() => {
  const {totalPrice, items, totalItems} = useStore('cart');
  const isEmptyCart = totalItems === 0;

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <section className="pl-16 pr-16 pt-16 sm:p-4 sm:mb-12">
        {isEmptyCart ? (
          <h1>Корзина пуста</h1>
        ) : (
          <>
            <h1 className="mb-8">У вас отличный вкус!</h1>
            <ul>
              {items.map((item) => (
                <CartItem item={item} />
              ))}
              <li className="mt-8 text-2xl flex justify-end w-full">
                {totalItems > 0 && (
                  <h3>
                    Итого к оплате: <Price price={formatPrice(totalPrice)} />
                  </h3>
                )}
              </li>
            </ul>
          </>
        )}
      </section>
    </>
  );
});

export default Cart;
