import {observer} from 'mobx-react-lite';
import Link from 'next/link';

import {useStore} from 'models';
import Price from '@/common/price/price';
import formatPrice from 'lib/formatPrice';
import Button from '@/common/buttons/button/button';
import CartItem from '@/cart/cartItem/cartItem';

const CartLayout = observer(() => {
  const {totalPrice, items, totalItems} = useStore('cart');
  const isEmptyCart = totalItems === 0;

  return (
    <section className="lg:pl-16 lg:pr-16 pt-16 sm:p-4 sm:mb-12 max-w-4xl flex flex-col ml-auto mr-auto">
      {isEmptyCart ? (
        <h1>Корзина пуста</h1>
      ) : (
        <>
          <h1>У вас отличный вкус!</h1>
          <ul className="mt-12 md:mt-8">
            {items.map((item) => (
              <CartItem key={`${item.id}_${item.modId}`} item={item} />
            ))}
            <li className="mt-8 text-2xl flex justify-end w-full">
              {totalItems > 0 && (
                <h3>
                  Итого к оплате: <Price price={formatPrice(totalPrice)} />
                </h3>
              )}
            </li>
          </ul>
          <div className="flex w-full justify-end mt-12 mb-12 sm:mt-6 sm:mb-6">
            <Button>
              <Link href="/checkout">
                <p className="sm:text-lg">Оформить заказ</p>
              </Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
});

export default CartLayout;
